
import React, { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

export const DebugConsole: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleLog = (e: any) => {
      setLogs(prev => [{
        timestamp: new Date().toLocaleTimeString(),
        message: e.detail.message,
        type: e.detail.type
      }, ...prev].slice(0, 20));
    };

    window.addEventListener('ai-debug-log', handleLog);
    return () => window.removeEventListener('ai-debug-log', handleLog);
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-black/80 text-white text-[10px] px-3 py-1.5 rounded-full z-[100] border border-white/20 hover:bg-black transition-all"
      >
        🔍 Show Debug Logs
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-[400px] bg-slate-900 text-white z-[100] shadow-2xl border-t border-slate-700 font-mono text-[10px] max-h-[300px] flex flex-col">
      <div className="p-2 border-b border-slate-700 flex justify-between items-center bg-slate-800">
        <span className="font-bold text-blue-400">GEMINI API DIAGNOSTICS</span>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕ Close</button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1">
          Env API_KEY: {process.env.API_KEY ? '✅ PRESENT' : '❌ MISSING'} <br/>
          UA: {navigator.userAgent.slice(0, 40)}...
        </div>
        {logs.length === 0 && <div className="text-slate-600 italic">Waiting for events...</div>}
        {logs.map((log, i) => (
          <div key={i} className={`${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-slate-300'}`}>
            <span className="opacity-50 mr-2">[{log.timestamp}]</span>
            {log.message}
          </div>
        ))}
      </div>
      <div className="p-2 bg-slate-800 border-t border-slate-700 flex gap-2">
        <button 
          onClick={() => setLogs([])}
          className="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600"
        >
          Clear
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-500"
        >
          Hard Reload
        </button>
      </div>
    </div>
  );
};

export const pushLog = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
  window.dispatchEvent(new CustomEvent('ai-debug-log', { detail: { message, type } }));
};
