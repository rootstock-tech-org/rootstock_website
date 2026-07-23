'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface Message {
  role: 'user' | 'rootie';
  text: string;
}

// Cropped avatar — zooms into Rootie's face from the laptop artwork
const RootieAvatar = ({ size }: { size: number }) => (
  <div
    className="rounded-full flex-shrink-0"
    style={{
      width: size,
      height: size,
      backgroundImage: 'url(/rootie_desk.png)',
      backgroundSize: '150%',
      backgroundPosition: '64% 16%',
      backgroundRepeat: 'no-repeat',
    }}
  />
);

const SECTION_MESSAGES: Record<string, string> = {
  about: "This is who we are — builders of intelligence!",
  technology: "These are our AI products across 4 domains",
  clients: "Amazing companies trust us with their AI journey",
  ethics: "We're hiring! Come build the future with us",
  contact: "Ready to connect? I'll get the team to you",
};

export default function RootieChat() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showHeroGreeting, setShowHeroGreeting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [companionMsg, setCompanionMsg] = useState<string | null>(null);
  const [lastSection, setLastSection] = useState('home');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount guard for portals
  useEffect(() => { setIsMounted(true); }, []);

  // Show hero greeting after 2s
  useEffect(() => {
    const t = setTimeout(() => setShowHeroGreeting(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Track hero visibility
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsHeroVisible(e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // Track section changes → fire contextual messages
  useEffect(() => {
    const sections = ['about', 'technology', 'clients', 'ethics', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id !== lastSection && SECTION_MESSAGES[id]) {
              setLastSection(id);
              if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
              setCompanionMsg(SECTION_MESSAGES[id]);
              msgTimerRef.current = setTimeout(() => setCompanionMsg(null), 4500);
            }
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      obs.disconnect();
      if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
    };
  }, [lastSection]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isChatOpen]);

  const sendMessage = async (override?: string) => {
    const text = override ?? input.trim();
    if (!text || loading) return;
    setInput('');
    setLoading(true);
    const next: Message[] = [...messages, { role: 'user', text }];
    setMessages(next);
    try {
      const res = await fetch('/api/rootie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(m => ({
            role: m.role === 'rootie' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      setMessages(p => [...p, { role: 'rootie', text: data.text }]);
      if (data.navigate) {
        setTimeout(() => {
          document.getElementById(data.navigate)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 700);
      }
    } catch {
      setMessages(p => [...p, { role: 'rootie', text: "Oops, give me a sec!" }]);
    } finally {
      setLoading(false);
    }
  };

  const openChat = () => {
    setShowHeroGreeting(false);
    setCompanionMsg(null);
    setIsChatOpen(true);
    if (messages.length === 0) setTimeout(() => sendMessage('Hi Rootie!'), 400);
  };

  // ─── Chat panel (rendered in portal, fixed bottom-right) ───────────────────
  const ChatPanel = (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="fixed bottom-6 right-6 w-[340px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[300] flex flex-col"
          style={{ height: '500px' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#3a6b38] to-[#2d5a2c] flex-shrink-0">
            <div className="flex-shrink-0">
              <RootieAvatar size={40} />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Rootie</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-white/70">Your site guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="ml-auto p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
            {messages.length === 0 && loading && <TypingIndicator />}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'rootie' && (
                  <div className="mb-0.5">
                    <RootieAvatar size={24} />
                  </div>
                )}
                <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#3a6b38] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && messages.length > 0 && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          {messages.length === 0 && !loading && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 flex-shrink-0">
              {['Our products', 'Join the team', 'About RootStock', 'Contact'].map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-[#3a6b38]/10 hover:text-[#3a6b38] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask Rootie anything..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-8 h-8 flex items-center justify-center bg-[#3a6b38] text-white rounded-full disabled:opacity-40 hover:bg-[#2d5a2c] transition-all flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ─── Floating companion (fixed bottom-left, only when scrolled past hero) ──
  const FloatingCompanion = (
    <AnimatePresence>
      {!isHeroVisible && (
        <motion.div
          key="companion"
          initial={{ opacity: 0, x: -30, scale: 0.7 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.7 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-[200] flex flex-col items-start gap-3"
        >
          {/* Contextual section message bubble */}
          <AnimatePresence mode="wait">
            {companionMsg && !isChatOpen && (
              <motion.div
                key={companionMsg}
                initial={{ opacity: 0, x: -12, y: 4, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-xl border border-gray-100 max-w-[210px]"
              >
                <p className="text-xs font-medium text-gray-800 leading-relaxed">{companionMsg}</p>
                {/* tiny tail */}
                <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Small Rootie button — bobs gently */}
          <motion.button
            onClick={openChat}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.93 }}
            animate={!isChatOpen ? { y: [0, -6, 0] } : { y: 0 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[82px] h-[82px] rounded-full bg-white shadow-2xl border-2 border-[#3a6b38]/25 hover:border-[#3a6b38] transition-colors overflow-hidden flex items-center justify-center"
            title="Chat with Rootie"
          >
            <RootieAvatar size={82} />
            {/* Online dot */}
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white shadow" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ── HERO: in-flow greeting bubble + chat button ── */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <AnimatePresence>
          {showHeroGreeting && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100"
            >
              <p className="text-sm font-semibold text-gray-800">Hi there!</p>
              <p className="text-xs text-gray-500 mt-0.5">I'll guide you through the site</p>
              {/* bubble tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={openChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white border border-[#3a6b38]/30 text-[#3a6b38] font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:border-[#3a6b38] transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#3a6b38] animate-pulse" />
          Chat with Rootie
        </motion.button>
      </div>

      {/* ── PORTAL: floating companion + chat panel ── */}
      {isMounted && createPortal(
        <>
          {FloatingCompanion}
          {ChatPanel}
        </>,
        document.body
      )}
    </>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-shrink-0">
        <RootieAvatar size={24} />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
