"use client";
import React, { useState } from 'react';

export default function ChatTerminal() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'agent', content: 'Welcome to the IPO Analysis Terminal. Upload an S-1 DRHP document or ask about real-time market news.' }
  ]);
  const [query, setQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setIsUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'agent', content: `Document ingested: ${data.filename}. Extracted ${data.chunks} chunks into ChromaDB. Ready for questions.` }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', content: 'Error uploading document. Check backend connection.' }]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    const currentQuery = query;
    setQuery('');

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: currentQuery })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'agent', content: data.nudge || data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', content: 'Agent connection failed. Ensure FastAPI is running.' }]);
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground lg:pl-20">
      {/* Side Navigation (Shell - Responsive Desktop Only) */}
      <aside className="hidden lg:flex flex-col h-screen w-20 hover:w-64 transition-all duration-300 fixed left-0 top-0 z-[55] border-r border-white/5 bg-surface-lowest py-8 overflow-hidden group">
        <div className="px-6 mb-12">
          <div className="text-xl font-black tracking-tighter text-primary">IC</div>
        </div>
        <div className="flex flex-col space-y-2 flex-grow">
          <a className="flex items-center px-6 py-4 text-gray-500 hover:text-white hover:bg-surface transition-all duration-200" href="/">
            <span className="material-symbols-outlined mr-4">dashboard</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-medium">Dashboard</span>
          </a>
          <a className="flex items-center px-6 py-4 text-primary border-r-2 border-primary bg-gradient-to-r from-[#46f1c5]/10 to-transparent" href="/chat">
            <span className="material-symbols-outlined mr-4">analytics</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-medium">Analysis Terminal</span>
          </a>
        </div>
      </aside>

      {/* Main Terminal Area */}
      <div className="flex-1 flex flex-col p-8 lg:p-12 h-screen">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">Agentic RAG Terminal</h1>
          <div>
            <label className="cursor-pointer bg-surface-highest hover:bg-primary hover:text-primary-foreground text-sm font-bold text-white px-6 py-3 rounded-full transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">upload_file</span>
              {isUploading ? 'Ingesting...' : 'Upload S-1 PDF'}
              <input type="file" accept="application/pdf" className="hidden" disabled={isUploading} onChange={handleUpload} />
            </label>
          </div>
        </div>

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto bg-surface-lowest rounded-xl p-8 mb-8 border border-white/5 shadow-inner">
          <div className="flex flex-col gap-6">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl p-6 rounded-[1.5rem] ${m.role === 'user' ? 'bg-surface-highest text-white' : 'glass ghost-border text-gray-300'}`}>
                  {m.role === 'agent' && <div className="text-[10px] text-primary uppercase font-bold tracking-widest mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-[14px]">smart_toy</span> Agent</div>}
                  {m.role === 'user' && <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-3 flex items-center justify-end gap-2">You <span className="material-symbols-outlined text-[14px]">person</span></div>}
                  <p className="leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="bg-surface p-4 rounded-full border border-white/10 flex items-center gap-4">
          <input 
            type="text" 
            className="flex-1 bg-transparent border-none outline-none text-white px-6 focus:ring-0 placeholder:text-gray-600" 
            placeholder="Ask about the downloaded DRHP or market risks..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="bg-primary text-primary-foreground p-3 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
