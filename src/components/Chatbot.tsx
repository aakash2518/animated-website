"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  from: "bot" | "user";
  text: string;
}

const BOT_NAME = "Royal";

// ── Knowledge base ──────────────────────────────────────────────
const KB: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "helo", "hii", "namaste", "namaskar", "start"],
    answer: `Hi there! 👋 I'm ${BOT_NAME}, your RoyalFinity assistant. I can help you with info about our services, pricing, contact details, and more. What would you like to know?`,
  },
  {
    keywords: ["service", "services", "offer", "what do you do", "kya karte", "kya hai"],
    answer: `RoyalFinity Technologies offers:\n\n• 🌐 Website Development\n• 📱 Mobile Apps (Android & iOS)\n• 📣 Digital Marketing\n• 📲 Social Media Marketing\n• 🔍 SEO Optimization\n• 💰 Google Ads (PPC)\n• ✍️ Content Marketing\n• ⚡ Progressive Web Apps\n• 🤖 Business Automation\n• 🎨 UI/UX Design\n\nWhich service would you like to know more about?`,
  },
  {
    keywords: ["website", "web development", "web design", "website development", "website banana"],
    answer: `Our Website Development service includes:\n\n• Custom business websites\n• E-commerce stores built to convert\n• CMS platforms — WordPress, Shopify\n• Landing pages & portfolios\n\nWe build fast, responsive, and SEO-friendly websites tailored to your brand. 🚀\n\nInterested? Contact us at info@royalfinitytechnologies.com`,
  },
  {
    keywords: ["mobile", "app", "android", "ios", "mobile app", "application"],
    answer: `Our Mobile App Development covers:\n\n• Android — Java, Kotlin\n• iOS — Swift, Objective-C\n• Performance-first, secure by default\n• Made for startups & growing brands\n\nWe build apps that users love! 📱`,
  },
  {
    keywords: ["digital marketing", "marketing", "ads", "advertisement", "promote"],
    answer: `Our Digital Marketing services include:\n\n• Google & social ads that convert\n• SEO that gets you found\n• Creative content marketing\n• Trust-building campaigns\n\nWe help you grow your online presence and get real results. 📈`,
  },
  {
    keywords: ["social media", "instagram", "facebook", "linkedin", "smm", "social"],
    answer: `Our Social Media Marketing includes:\n\n• Instagram, Facebook & LinkedIn growth\n• Reels & creative campaigns\n• Page management & strategy\n• Community building\n\nFollow us on Instagram: @royalfinitytechnologies 📲`,
  },
  {
    keywords: ["seo", "search engine", "ranking", "google ranking", "organic"],
    answer: `Our SEO services include:\n\n• Keyword research & on-page SEO\n• Technical SEO & site optimization\n• Backlinks & authority building\n• Local SEO for more leads\n\nWe help you rank higher on Google and get more organic traffic. 🔍`,
  },
  {
    keywords: ["google ads", "ppc", "sem", "paid ads", "google advertising"],
    answer: `Our Google Ads (PPC) service includes:\n\n• Search & display campaigns\n• YouTube ads\n• Smart & remarketing campaigns\n• ROI-driven optimization\n\nEvery click counts — we make it profitable! 💰`,
  },
  {
    keywords: ["content", "blog", "writing", "copywriting", "content marketing"],
    answer: `Our Content Marketing services:\n\n• Blog writing & SEO content\n• Creative copywriting\n• Email marketing campaigns\n• Brand storytelling\n\nGreat content builds great brands. ✍️`,
  },
  {
    keywords: ["pwa", "progressive web app", "progressive"],
    answer: `Progressive Web Apps (PWA) give your users an app-like experience directly in the browser — no app store needed!\n\n• Offline support\n• Fast loading\n• Push notifications\n• Works on all devices ⚡`,
  },
  {
    keywords: ["automation", "business automation", "ai", "artificial intelligence", "automate"],
    answer: `Our Business Automation & AI services help you:\n\n• Automate repetitive tasks\n• Integrate AI into your workflow\n• Save time and reduce costs\n• Scale operations efficiently 🤖`,
  },
  {
    keywords: ["ui", "ux", "design", "ui/ux", "interface", "user experience"],
    answer: `Our UI/UX Design service delivers:\n\n• Beautiful, intuitive interfaces\n• User research & wireframing\n• Prototyping & testing\n• Brand-consistent design systems 🎨`,
  },
  {
    keywords: ["price", "pricing", "cost", "kitna", "charge", "rate", "budget", "how much", "fees"],
    answer: `Our pricing depends on the scope of your project. We offer flexible packages for startups, SMEs, and enterprises.\n\n📩 Get a free quote:\nEmail: info@royalfinitytechnologies.com\n📞 Call: +91 92118 16999\n\nWe'll understand your needs and give you the best value! 💼`,
  },
  {
    keywords: ["contact", "reach", "call", "email", "phone", "number", "address", "location", "where"],
    answer: `You can reach us at:\n\n📍 5C/15, New Industrial Township 5, Faridabad, Haryana 121001\n\n📧 info@royalfinitytechnologies.com\n\n📞 +91 92118 16999\n\n🕐 Mon–Sat · 10:00–19:00 IST`,
  },
  {
    keywords: ["about", "who are you", "company", "royalfinity", "team", "about us"],
    answer: `RoyalFinity Technologies is a full-service digital agency based in Faridabad, India. 🏢\n\nWe create brands that communicate and connect with people. We specialize in Digital Marketing, Corporate Identity Design, Website Designing, Mobile Apps, and much more.\n\nOur mission: Digital growth, simplified. 🚀`,
  },
  {
    keywords: ["portfolio", "work", "projects", "case study", "examples", "clients"],
    answer: `We've worked with brands across various industries. Check out our portfolio at:\n\n🔗 royalfinitytechnologies.com/portfolio\n\nFrom luxury brands to tech startups — we deliver results! ✨`,
  },
  {
    keywords: ["blog", "articles", "journal", "insights", "read"],
    answer: `We regularly publish insights on web development, design, marketing, and business growth.\n\n📖 Read our latest articles at:\nroyalfinitytechnologies.com/blog`,
  },
  {
    keywords: ["faridabad", "haryana", "india", "location", "office"],
    answer: `Our office is located at:\n\n📍 5C/15, New Industrial Township 5\nFaridabad, Haryana 121001, India\n\nFeel free to visit us Mon–Sat between 10:00–19:00 IST! 🏢`,
  },
  {
    keywords: ["hours", "timing", "open", "working hours", "time"],
    answer: `We're available:\n\n🕐 Monday to Saturday\n⏰ 10:00 AM – 7:00 PM IST\n\nFor urgent queries, email us at info@royalfinitytechnologies.com and we'll get back to you ASAP! 📩`,
  },
  {
    keywords: ["thanks", "thank you", "thankyou", "shukriya", "dhanyawad"],
    answer: `You're welcome! 😊 It was a pleasure helping you. If you have any more questions, feel free to ask. Have a great day! 🌟`,
  },
  {
    keywords: ["bye", "goodbye", "see you", "alvida", "ok bye"],
    answer: `Goodbye! 👋 Feel free to come back anytime. RoyalFinity is always here to help you grow! 🚀`,
  },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return `I'm not sure about that, but I'd love to help! 🤔\n\nFor specific queries, please reach out to us directly:\n\n📧 info@royalfinitytechnologies.com\n📞 +91 92118 16999\n\nOr ask me about our services, pricing, contact info, or portfolio!`;
}

// ── Quick suggestions ────────────────────────────────────────────
const SUGGESTIONS = ["Our Services", "Pricing", "Contact Us", "About Us", "Portfolio"];

// ── Icons ────────────────────────────────────────────────────────
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

// ── Component ────────────────────────────────────────────────────
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: `Hi! 👋 I'm ${BOT_NAME}, your RoyalFinity assistant.\n\nAsk me anything about our services, pricing, or how to get in touch!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-28 right-5 z-50 w-[340px] max-w-[calc(100vw-2rem)] flex flex-col bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden h-[480px]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-(--gold) shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-black font-bold text-sm">R</div>
              <div>
                <p className="font-display text-black text-sm font-bold leading-none">{BOT_NAME}</p>
                <p className="text-black/60 text-[9px] font-mono uppercase tracking-widest mt-0.5">RoyalFinity Assistant</p>
              </div>
            </div>
            <button
              type="button"
              title="Close chat"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-black/60 hover:text-black transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-(--gold) text-black rounded-br-sm font-medium"
                      : "bg-white/5 border border-white/8 text-white/80 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/8 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                title={s}
                aria-label={s}
                onClick={() => sendMessage(s)}
                className="shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-wider text-white/50 hover:text-(--gold) hover:border-(--gold)/30 transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2 flex gap-2 shrink-0 border-t border-white/5">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/20 outline-none focus:border-(--gold)/40 transition-all"
            />
            <button
              type="submit"
              title="Send message"
              aria-label="Send message"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-(--gold) flex items-center justify-center text-black disabled:opacity-30 hover:scale-105 transition-all shrink-0"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        type="button"
        title={open ? "Close chat" : "Open chat"}
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-(--gold) flex items-center justify-center text-black shadow-lg shadow-(--gold)/30 hover:scale-110 transition-all duration-300"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
  );
}
