"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useColors } from '@/components/ColorProvider';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const ALFRED_THOUGHTS = [
  "How may I assist your engineering inquiry?",
  "Reviewing architectural configurations...",
  "Shall I summon Jason's résumé details?",
  "Standing by for technical analysis...",
  "Inquiries concerning system scale welcome."
];

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayedText}</>;
}

export default function ButlerWidget() {
  const colors = useColors();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Good day. I am Alfred, Jason's digital chief of staff. How may I assist your engineering inquiry today?", isStreaming: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thought, setThought] = useState("");
  const [showThought, setShowThought] = useState(false);
  
  // Track routing destinations cleanly to hold until streaming completes
  const [pendingTargetId, setPendingTargetId] = useState<string>("");
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setShowThought(false);
      return;
    }

    const initialTimeout = setTimeout(() => {
      setThought(ALFRED_THOUGHTS[0]);
      setShowThought(true);
    }, 3000);

    const hideTimeout = setTimeout(() => {
      setShowThought(false);
    }, 8000);

    const loopInterval = setInterval(() => {
      if (isOpen) return;
      const randomMsg = ALFRED_THOUGHTS[Math.floor(Math.random() * ALFRED_THOUGHTS.length)];
      setThought(randomMsg);
      setShowThought(true);

      setTimeout(() => {
        setShowThought(false);
      }, 5000);
    }, 14000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(hideTimeout);
      clearInterval(loopInterval);
    };
  }, [isOpen]);

  // Unified callback running directly when Alfred finishes printing text
  const handleStreamingComplete = (currentIndex: number) => {
    setMessages((prev) => 
      prev.map((m, i) => i === currentIndex ? { ...m, isStreaming: false } : m)
    );

    // Only route if there is an active structural destination waiting for completion
    if (pendingTargetId) {
      setTimeout(() => {
        setIsOpen(false); 
        const targetElement = document.getElementById(pendingTargetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setPendingTargetId(""); // Flush state clear
      }, 400); // Elegant micro-pause after typing stops before panel dismisses
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages.map(m => ({ role: m.role, content: m.content })), userMessage] }),
      });

      const data = await response.json();
      if (data.message) {
        let replyText = data.message;
        let targetId = "";

       if (replyText.includes('[TRIGGER_SCROLL_CONTACT]')) {
          replyText = replyText.replace('[TRIGGER_SCROLL_CONTACT]', '').trim();
          targetId = "contact";
        } else if (replyText.includes('[TRIGGER_SCROLL_PROJECTS]')) {
          replyText = replyText.replace('[TRIGGER_SCROLL_PROJECTS]', '').trim();
          targetId = "projects";
        } else if (replyText.includes('[TRIGGER_SCROLL_BIO]')) {
          replyText = replyText.replace('[TRIGGER_SCROLL_BIO]', '').trim();
          targetId = "bio";
        } else if (replyText.includes('[TRIGGER_SCROLL_CERTS]')) { // Add this block
          replyText = replyText.replace('[TRIGGER_SCROLL_CERTS]', '').trim();
          targetId = "certs"; 
        }

        // Cache coordinates to run securely when typewriter hits onComplete
        setPendingTargetId(targetId);
        setMessages((prev) => [...prev, { role: 'assistant', content: replyText, isStreaming: true }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: "Forgive me, my connection dropped. Try again shortly." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "An execution anomaly occurred on my end." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes alfredBounce {
          0%, 100%, 20%, 50%, 80% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-2px); }
        }
        .animate-alfred { animation: alfredBounce 5s infinite ease-in-out; }
        @keyframes customPulse {
          0%, 100% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        .dot-pulse { animation: customPulse 1.4s infinite ease-in-out; }
      `}} />

      {/* ─── FLOATING AMBIENT THOUGHT BUBBLE ─── */}
      <div className={`fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 bg-zinc-950 border border-zinc-800 text-white px-3 py-2 rounded-xl shadow-xl max-w-[200px] sm:max-w-[240px] text-[10px] sm:text-[11px] font-sans tracking-wide transition-all duration-300 pointer-events-none origin-bottom-right ${showThought && !isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'}`}>
        <div className="font-medium font-serif italic text-zinc-200 leading-relaxed">{thought}</div>
        <span className="absolute bottom-[-5px] right-5 sm:right-6 w-2 h-2 bg-zinc-950 border-r border-b border-zinc-800 rotate-45" />
      </div>

      {/* ─── FLOATING TOGGLE ─── */}
      <button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-3 sm:p-4 bg-white hover:bg-zinc-50 text-zinc-900 rounded-full shadow-2xl border-2 border-zinc-950 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group select-none ${!isOpen ? 'animate-alfred hover:animate-none' : ''}`}>
        {!isOpen && <span className="absolute inset-0 rounded-full border border-zinc-950/20 animate-ping opacity-40 [animation-duration:2.5s]" />}
        <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
          {isOpen ? <span className="absolute block w-3.5 h-0.5 bg-zinc-900 rotate-45 transition-transform duration-300" /> : <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-zinc-900 rounded-xs rotate-45 flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-zinc-900 translate-y-1.5 translate-x-1.5 rotate-45" /></div>}
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold font-sans uppercase tracking-[0.2em] text-zinc-900 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">{isOpen ? 'Dismiss Alfred' : 'Summon Butler'}</span>
      </button>

      {/* ─── CHAT DRAWER LAYOUT ─── */}
      <div className={`fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[420px] sm:h-[520px] z-50 rounded-2xl border ${colors.border} ${colors.cardBg || 'bg-white'} shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out origin-bottom-right transform ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
        <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${colors.border} bg-zinc-900 flex items-center justify-between text-white`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-zinc-900 border border-zinc-800 flex justify-center overflow-hidden shrink-0 shadow-inner"><div className="absolute top-0 w-4 h-5 sm:w-5 sm:h-6 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} /><div className="absolute top-1.5 sm:top-2 w-1 h-1 bg-zinc-900 rounded-full" /><div className="absolute top-3 sm:top-3.5 w-1 h-1 bg-zinc-900 rounded-full" /></div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold font-sans uppercase tracking-[0.18em] text-white">Alfred</h4>
              <p className="text-[8px] sm:text-[9px] text-zinc-400 font-semibold font-sans tracking-[0.12em] uppercase flex items-center gap-1.5 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />Groq Engine Active</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4 bg-zinc-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-3.5 py-2 sm:px-4 sm:py-3 border shadow-xs transition-all duration-300 transform ${
                  msg.role === 'user' 
                    ? 'bg-zinc-900 border-zinc-900 text-white font-sans text-[11px] sm:text-xs tracking-wide font-normal' 
                    : `${colors.border} bg-white text-zinc-900 font-medium font-serif italic text-[11px] sm:text-[13px] tracking-wide leading-relaxed ${
                        msg.isStreaming 
                          ? 'translate-x-2 sm:translate-x-4 opacity-90 border-zinc-300' 
                          : 'translate-x-0 opacity-100'
                      }`
                }`}
              >
                {msg.role === 'assistant' && msg.isStreaming ? (
                  <TypewriterText 
                    text={msg.content} 
                    onComplete={() => handleStreamingComplete(idx)} 
                  />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-200">
              <div className={`rounded-2xl px-4 py-3 border ${colors.border} bg-white flex items-center gap-1 shadow-2xs min-w-[50px] translate-x-2 sm:translate-x-4 opacity-90`}>
                <span className="w-1 h-1 bg-zinc-800 rounded-full dot-pulse" />
                <span className="w-1 h-1 bg-zinc-800 rounded-full dot-pulse [animation-delay:0.2s]" />
                <span className="w-1 h-1 bg-zinc-800 rounded-full dot-pulse [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Form Processing & Guidance Note */}
        <div className={`border-t ${colors.border} bg-white p-3 sm:p-4 flex flex-col gap-2`}>
          <div className="text-[9px] sm:text-[10px] text-zinc-400 font-medium font-sans tracking-wide px-1 flex items-center gap-1.5 select-none">
            <span className="w-1 h-1 bg-zinc-400 rounded-full shrink-0" />
            Tip: Say <span className="font-bold text-zinc-700 font-mono text-[10px] sm:text-[11px]">"take me to projects/ contacts / bio / certs or certificates"</span>
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Inquire about Jason's availability..." className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 sm:py-3 text-[11px] sm:text-xs font-sans tracking-wide text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-500 focus:bg-white transition-all duration-200" disabled={isLoading} />
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-100 text-white disabled:text-zinc-400 px-4 sm:px-5 rounded-xl text-[11px] sm:text-xs font-bold font-sans uppercase tracking-[0.12em] transition-all duration-200 active:scale-95">Ask</button>
          </form>
        </div>
      </div>
    </>
  );
}