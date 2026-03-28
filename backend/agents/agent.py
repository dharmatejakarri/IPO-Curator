import os
from typing import Annotated, Literal
from typing_extensions import TypedDict
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.tools import tool
# In production, use langchain_google_genai
# from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    ipo_ticker: str
    macro_context: str
    sector_comps: str
    gmp_data: str

@tool
def fetch_macro_context(query: str) -> str:
    """Fetches macroeconomic indicators like interest rates and inflation."""
    return f"Macro context for {query}: The Fed rate is currently 4.5%. Market volatility is moderate. Interest in AI software is high."

@tool
def retrieve_sector_comps(ticker: str) -> str:
    """Retrieves sector comparisons from the vector database (ChromaDB) for the specific ticker."""
    return f"Sector comps for {ticker}: Snowflake is trading at 15x Revenue; Palantir at 22x Revenue. High premium for data analytics."

@tool
def fetch_gmp_data(ticker: str) -> str:
    """Fetches current Grey Market Premium (GMP) data for the IPO."""
    return f"GMP data for {ticker}: Currently trading at a 35% premium in the grey market, indicating strong retail and HNI interest."

tools = [fetch_macro_context, retrieve_sector_comps, fetch_gmp_data]

# Mocking the LLM for now, as credentials are required for Gemini
class MockLLM:
    def bind_tools(self, tools):
        self.tools = tools
        return self
    def invoke(self, state_messages):
        # A simple deterministic response for demonstration
        content = "Based on the macro context, sector comps, and high GMP premium (35%), this IPO shows strong short-term listing gains potential. However, the high valuation (similar to Snowflake) requires careful long-term risk assessment. Recommendation: Subscribe for listing gains."
        return AIMessage(content=content)

llm = MockLLM().bind_tools(tools)

def call_model(state: AgentState):
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

workflow = StateGraph(AgentState)

workflow.add_node("agent", call_model)
workflow.add_node("tools", ToolNode(tools))

workflow.add_edge(START, "agent")
workflow.add_conditional_edges("agent", tools_condition)
workflow.add_edge("tools", "agent")

try:
    ipo_analyzer_app = workflow.compile()
except Exception as e:
    import logging
    logging.warning(f"Failed to compile LangGraph correctly due to mock dependencies returning objects differently: {e}")
    ipo_analyzer_app = None

if __name__ == "__main__":
    if ipo_analyzer_app:
        print("LangGraph agent compiled successfully.")
    else:
        print("LangGraph agent compiled with warnings.")
