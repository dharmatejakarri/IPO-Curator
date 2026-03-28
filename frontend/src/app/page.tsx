import Image from "next/image";

export default function Home() {
  return (
    <main className="lg:pl-20 min-h-screen">
      {/* Top Navigation (Shell) */}
      <nav className="fixed top-0 right-0 left-0 h-20 z-50 glass bg-[#131313]/60 flex justify-between items-center px-12 w-full">
        <div className="text-2xl font-black tracking-tighter text-white">IPO Curator</div>
        <div className="hidden md:flex space-x-8 items-center">
          <a className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-primary" href="#">Market</a>
          <a className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-400 hover:text-primary transition-colors duration-300" href="#">Watchlist</a>
          <a className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-400 hover:text-primary transition-colors duration-300" href="#">News</a>
          <div className="flex items-center space-x-6 ml-4">
            <span className="material-symbols-outlined text-gray-400 hover:text-white cursor-pointer">search</span>
            <span className="material-symbols-outlined text-gray-400 hover:text-white cursor-pointer">notifications</span>
            <button className="bg-primary px-6 py-2 rounded-full text-primary-foreground font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity">Subscribe</button>
          </div>
        </div>
      </nav>

      {/* Side Navigation (Shell - Responsive Desktop Only) */}
      <aside className="hidden lg:flex flex-col h-screen w-20 hover:w-64 transition-all duration-300 fixed left-0 top-0 z-[55] border-r border-white/5 bg-surface-lowest py-8 overflow-hidden group">
        <div className="px-6 mb-12">
          <div className="text-xl font-black tracking-tighter text-primary">IC</div>
        </div>
        <div className="flex flex-col space-y-2 flex-grow">
          <a className="flex items-center px-6 py-4 text-primary border-r-2 border-primary bg-gradient-to-r from-[#46f1c5]/10 to-transparent" href="#">
            <span className="material-symbols-outlined mr-4">dashboard</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-medium">Dashboard</span>
          </a>
          <a className="flex items-center px-6 py-4 text-gray-500 hover:text-white hover:bg-surface transition-all duration-200" href="#">
            <span className="material-symbols-outlined mr-4">calendar_today</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-medium">IPO Calendar</span>
          </a>
          <a className="flex items-center px-6 py-4 text-gray-500 hover:text-white hover:bg-surface transition-all duration-200" href="#">
            <span className="material-symbols-outlined mr-4">analytics</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-medium">Analysis</span>
          </a>
          <a className="flex items-center px-6 py-4 text-gray-500 hover:text-white hover:bg-surface transition-all duration-200" href="#">
            <span className="material-symbols-outlined mr-4">pie_chart</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-medium">Portfolio</span>
          </a>
        </div>
        <div className="px-6 mt-auto">
          <a className="flex items-center text-gray-500 hover:text-white py-4 transition-colors" href="#">
            <span className="material-symbols-outlined mr-4">settings</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-medium">Settings</span>
          </a>
        </div>
      </aside>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-64 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white font-bold leading-tight tracking-tighter mb-12" style={{ fontSize: "clamp(3rem, 8vw, 80pt)" }}>
            Analyze IPOs with AI Agents
          </h1>
          <p className="text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed mb-16 opacity-80">
            Agentic RAG framework delivers summaries, editable data, historical suggestions, and real-world adaptations for the modern investor.
          </p>
          <div className="flex flex-col items-center gap-8">
            <button className="ambient-shadow h-20 px-12 rounded-full gradient-primary text-primary-foreground text-xl font-bold transition-all duration-500 scale-100 hover:scale-105">
              Start Analysis
            </button>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Powered by LangGraph & Streamlit</p>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32 px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="group md:col-span-2 md:row-span-2 bg-surface p-12 rounded-[1.5rem] flex flex-col justify-between hover:-translate-y-1 hover:bg-surface-highest transition-all duration-300">
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6">analytics</span>
              <h3 className="text-3xl font-bold mb-4 text-white">AI Summaries</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">Instant distillation of S-1 filings using multi-agent reasoning paths. Get to the truth behind the prospectus in seconds.</p>
            </div>
            <div className="mt-8 bg-surface-lowest p-6 rounded-lg">
              <div className="h-1 w-full bg-white/5 rounded-full mb-2 overflow-hidden">
                <div className="h-full bg-primary w-3/4"></div>
              </div>
              <p className="text-[10px] text-primary uppercase font-bold">Processing Risk Analysis...</p>
            </div>
          </div>
          
          <div className="group bg-surface p-10 rounded-[1.5rem] hover:-translate-y-1 hover:bg-surface-highest transition-all duration-300">
            <span className="material-symbols-outlined text-secondary text-3xl mb-6">timeline</span>
            <h3 className="text-xl font-bold mb-2 text-white">Historical Suggestions</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Cross-reference current listings with performance data from 5,000+ past public offerings.</p>
          </div>
          
          <div className="group bg-surface p-10 rounded-[1.5rem] hover:-translate-y-1 hover:bg-surface-highest transition-all duration-300">
            <span className="material-symbols-outlined text-primary text-3xl mb-6">public</span>
            <h3 className="text-xl font-bold mb-2 text-white">Real-World Scenarios</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Stress test IPO valuations against geopolitical shifts and market volatility simulations.</p>
          </div>
          
          <div className="group md:col-span-2 bg-surface p-10 rounded-[1.5rem] flex items-center gap-8 hover:-translate-y-1 hover:bg-surface-highest transition-all duration-300">
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2 text-white">Data Growth</h3>
              <p className="text-muted-foreground text-sm">Automated ingestion of real-time SEC EDGAR feeds and market sentiment analysis.</p>
            </div>
            <span className="material-symbols-outlined text-secondary text-5xl">database</span>
          </div>
          
          <div className="group bg-surface p-10 rounded-[1.5rem] hover:-translate-y-1 hover:bg-surface-highest transition-all duration-300">
            <span className="material-symbols-outlined text-primary text-3xl mb-6">edit_note</span>
            <h3 className="text-xl font-bold mb-2 text-white">User Editable</h3>
            <p className="text-muted-foreground text-sm">Correct the AI, override assumptions, and customize your personal analysis framework.</p>
          </div>
          
          <div className="group bg-surface p-10 rounded-[1.5rem] hover:-translate-y-1 hover:bg-surface-highest transition-all duration-300">
            <span className="material-symbols-outlined text-secondary text-3xl mb-6">rocket_launch</span>
            <h3 className="text-xl font-bold mb-2 text-white">Free & Fast</h3>
            <p className="text-muted-foreground text-sm">Enterprise-grade RAG infrastructure delivered via high-speed serverless deployment.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 px-12 flex flex-col md:flex-row justify-between items-center gap-12 text-gray-500">
        <div className="text-xl font-black tracking-tighter text-white">IPO Curator</div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs font-medium tracking-widest uppercase">Powered by Next.js & FastAPI</p>
          <p className="text-[10px] opacity-50">© 2026 Financial Curator Technologies. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a className="hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms</a>
          <a className="hover:text-primary transition-colors" href="#">API</a>
        </div>
      </footer>
    </main>
  );
}
