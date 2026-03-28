from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil
import tempfile
from dotenv import load_dotenv

# LangChain Imports
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

load_dotenv()

app = FastAPI(
    title="IPO Curator API",
    description="Agentic RAG backend for IPO Analysis",
    version="1.0.0"
)

# Allow CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    ipo_ticker: str | None = None

# Initialize persistent Chroma DB and Embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_store_path = os.path.join(os.getcwd(), "chroma_db")
vector_store = Chroma(
    collection_name="ipo_drhps",
    embedding_function=embeddings,
    persist_directory=vector_store_path
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Welcome to the IPO Curator API"}

@app.post("/api/upload")
async def handle_document_upload(file: UploadFile = File(...)):
    """
    RAG Setup: Accepts a PDF DRHP, chunks it, embeds it, and stores in ChromaDB.
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    # Save UploadFile to a temporary file for PyPDFLoader
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        # Load and split the PDF
        loader = PyPDFLoader(tmp_path)
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_documents(docs)
        
        # Ingest into ChromaDB
        vector_store.add_documents(chunks)
        
        return {
            "status": "success", 
            "filename": file.filename, 
            "chunks": len(chunks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed processing PDF: {str(e)}")
    finally:
        os.remove(tmp_path)

@app.post("/api/chat")
async def analyze_query(request: QueryRequest):
    """
    Query the RAG vector store for relevant knowledge.
    Returns simulated agentic analysis based on retrieved chunks.
    """
    try:
        # Retrieve context from Chroma
        retriever = vector_store.as_retriever(search_kwargs={"k": 3})
        relevant_docs = retriever.invoke(request.query)
        
        if relevant_docs:
            context = "\n\n".join([doc.page_content for doc in relevant_docs])
            # Simulated Agent logic crossing LLM logic without requiring live API keys
            nudge = f"Based on the uploaded documents, here is what I found regarding your query '{request.query}':\n\n{context[:500]}...\n\n[Agent Recommendation]: The fundamentals extracted indicate significant infrastructure spending expectations. Monitor valuation ratios closely."
        else:
            nudge = f"I could not find directly relevant information in the uploaded DRHPs for '{request.query}'. Please ensure the S-1 is uploaded."
            
        return {
            "status": "success",
            "nudge": nudge
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
