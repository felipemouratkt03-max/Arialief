
import React, { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

// Global buffer for logs before component mounts
const logBuffer: LogEntry[] = [];
const listeners = new Set<(log: LogEntry) => void>();

export const pushLog = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
  const newLog = {
    timestamp: new Date().toLocaleTimeString(),
    message,
    type
  };
  logBuffer.unshift(newLog);
  if (logBuffer.length > 50) logBuffer.pop();
  listeners.forEach(l => l(newLog));
  console.log(`[AI-DEBUG] ${message}`);
};

export const DebugConsole: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([...logBuffer]);
  const [isOpen, setIsOpen] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'present' | 'missing'>('checking');

  useEffect(() => {
    const updateLogs = (log: LogEntry) => {
      setLogs(prev => [log, ...prev].slice(0, 50));
    };
    listeners.add(updateLogs);

    const checkStatus = () => {
      const key = process.env.API_KEY;
      setApiKeyStatus(key && key.length > 5 ? 'present' : 'missing');
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 2000);

    return () => {
      listeners.delete(updateLogs);
      clearInterval(interval);
    };
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-black/90 text-white text-[10px] px-4 py-2 rounded-full z-[100] border border-white/20 hover:bg-black shadow-2xl transition-all flex items-center gap-2"
      >
        <span className={`w-2 h-2 rounded-full ${apiKeyStatus === 'present' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></span>
        DIAGNÓSTICO DE ERROS
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-[450px] bg-slate-950 text-slate-300 z-[100] shadow-2xl border-t border-slate-800 font-mono text-[11px] max-h-[400px] flex flex-col antialiased">
      <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-400">GEMINI API ENGINE</span>
          <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">v2.5-flash-image</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white p-1">✕</button>
      </div>
      
      <div className="bg-slate-900/50 p-3 border-b border-slate-800 grid grid-cols-2 gap-2 text-[10px]">
        <div className="flex flex-col">
          <span className="text-slate-500 uppercase text-[9px]">Status da Chave:</span>
          <span className={apiKeyStatus === 'present' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
            {apiKeyStatus === 'present' ? '✅ CONECTADA' : '❌ NÃO SELECIONADA'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 uppercase text-[9px]">Objeto AI Studio:</span>
          <span className={(window as any).aistudio ? 'text-green-400 font-bold' : 'text-yellow-400 font-bold'}>
            {(window as any).aistudio ? '✅ DISPONÍVEL' : '⚠️ AGUARDANDO...'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
        {logs.length === 0 && <div className="text-slate-600 italic py-4 text-center">Nenhum evento registrado ainda.</div>}
        {logs.map((log, i) => (
          <div key={i} className={`pb-1 border-b border-slate-900/50 ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-slate-400'}`}>
            <span className="opacity-40 text-[9px] mr-2">[{log.timestamp}]</span>
            <span className="break-words">{log.message}</span>
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <button 
          onClick={() => { logBuffer.length = 0; setLogs([]); }}
          className="flex-1 bg-slate-800 py-2 rounded text-slate-300 hover:bg-slate-700 transition-colors uppercase font-bold text-[9px]"
        >
          Limpar Console
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="flex-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 py-2 rounded hover:bg-blue-600/30 transition-colors uppercase font-bold text-[9px]"
        >
          Recarregar App
        </button>
      </div>
    </div>
  );
};
