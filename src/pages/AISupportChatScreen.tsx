import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bot, User, ShieldAlert, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

type Message = {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  mood?: "calm" | "stress" | "crisis";
};

const crisisKeywords = ["suicide", "kill myself", "end my life", "die", "can't go on", "no reason to live", "hurt myself"];
const stressKeywords = ["scared", "afraid", "fear", "anxious", "panic", "stressed", "helpless", "alone", "crying", "depressed", "sad", "unsafe", "danger", "harass", "abuse", "stalking"];

function detectMood(text: string): "calm" | "stress" | "crisis" {
  const lower = text.toLowerCase();
  if (crisisKeywords.some((k) => lower.includes(k))) return "crisis";
  if (stressKeywords.some((k) => lower.includes(k))) return "stress";
  return "calm";
}

function getAIResponse(userMessage: string, mood: "calm" | "stress" | "crisis"): string {
  if (mood === "crisis") {
    return "I'm really concerned about you. Please know that you matter and help is available right now. 🆘\n\n**Please call immediately:**\n- Women Helpline: **1091**\n- Emergency: **112**\n- iCall: **9152987821**\n\nYou are not alone. Would you like me to alert your emergency contacts?";
  }

  if (mood === "stress") {
    const responses = [
      "I can hear that you're going through a tough time. Your feelings are completely valid. 💛\n\nTry this: Take 3 deep breaths — inhale for 4 seconds, hold for 4, exhale for 4. I'm right here with you.",
      "That sounds really difficult, and I'm sorry you're dealing with this. You're showing incredible strength just by reaching out. 💪\n\nWould you like to talk more about what's troubling you, or would you prefer some calming exercises?",
      "I understand how overwhelming this must feel. Remember — it's okay to not be okay sometimes. 🌸\n\nHere's something that might help: Try grounding yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  const responses = [
    "I'm glad you're reaching out! How are you feeling today? I'm here to listen and support you. 😊",
    "Thank you for sharing. Remember, taking time for yourself is important. What's on your mind?",
    "That's great to hear! Is there anything specific you'd like to talk about? I'm here for you. 💛",
    "I appreciate you opening up. Self-care is so important. Would you like some tips for relaxation or just want to chat?",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

const AISupportChatScreen = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi there! 👋 I'm your anonymous emotional support companion. Everything you share here is **completely private and confidential**.\n\nHow are you feeling today?",
      timestamp: new Date(),
      mood: "calm",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const mood = detectMood(userMessage);
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
      mood,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage, mood);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: mood === "crisis" ? "system" : "assistant",
        content: aiResponse,
        timestamp: new Date(),
        mood,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const renderMessage = (msg: Message) => {
    const isUser = msg.role === "user";
    const isCrisis = msg.role === "system";

    return (
      <motion.div
        key={msg.id}
        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={`flex gap-2 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              isUser ? "bg-primary" : isCrisis ? "bg-destructive" : "bg-accent"
            }`}
          >
            {isUser ? (
              <User className="w-4 h-4 text-primary-foreground" />
            ) : isCrisis ? (
              <ShieldAlert className="w-4 h-4 text-destructive-foreground" />
            ) : (
              <Bot className="w-4 h-4 text-primary" />
            )}
          </div>
          <div
            className={`px-4 py-3 rounded-2xl text-sm font-body leading-relaxed ${
              isUser
                ? "bg-primary text-primary-foreground rounded-br-md"
                : isCrisis
                ? "bg-destructive/10 border border-destructive/30 text-foreground rounded-bl-md"
                : "bg-card border border-border text-foreground rounded-bl-md"
            }`}
          >
            {msg.content.split("\n").map((line, i) => (
              <p key={i} className={i > 0 ? "mt-1" : ""}>
                {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="font-display font-700">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            ))}
            <p className="text-[10px] mt-2 opacity-50">
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border bg-card">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-display font-800 text-foreground">AI Support Companion</h1>
          <p className="text-[10px] text-muted-foreground font-body">Anonymous • Confidential • 24/7</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-muted-foreground font-body">Online</span>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="mx-4 mt-3 mb-1 px-3 py-2 rounded-xl bg-accent/50 border border-border">
        <p className="text-[10px] text-muted-foreground font-body text-center">
          🔒 This chat is anonymous. No personal data is stored or shared.
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map(renderMessage)}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex gap-2 items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-card border border-border">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="h-11 rounded-xl bg-muted border-border font-body text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-card disabled:opacity-50 transition-opacity shrink-0"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISupportChatScreen;
