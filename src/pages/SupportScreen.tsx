import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Phone, Sparkles, Bot, Wind, Brain, BookOpen, MessageCircle, X } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion, AnimatePresence } from "framer-motion";

const relaxationTips = [
  {
    icon: Wind,
    title: "Deep Breathing",
    description: "4-7-8 breathing technique to calm your mind",
    steps: [
      "Breathe in slowly through your nose for 4 seconds",
      "Hold your breath gently for 7 seconds",
      "Exhale slowly through your mouth for 8 seconds",
      "Repeat 3-4 times until you feel calmer",
    ],
  },
  {
    icon: Brain,
    title: "Meditation",
    description: "5-minute grounding meditation",
    steps: [
      "Close your eyes and sit comfortably",
      "Name 5 things you can see around you",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell, 1 you can taste",
    ],
  },
  {
    icon: BookOpen,
    title: "Journaling",
    description: "Write down your thoughts and feelings",
    steps: [
      "Find a quiet place and grab a pen & paper",
      "Write how you're feeling right now — no filter",
      "List 3 things you're grateful for today",
      "Write one kind thing about yourself",
    ],
  },
  {
    icon: MessageCircle,
    title: "Talk to Someone",
    description: "Reach out for human connection",
    steps: [
      "Call a friend or family member you trust",
      "Share how you're feeling — it's okay to be vulnerable",
      "If no one is available, try our AI Support Chat",
      "Remember: asking for help is a sign of strength",
    ],
  },
];

const SupportScreen = () => {
  const navigate = useNavigate();
  const [activeTip, setActiveTip] = useState<number | null>(null);

  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        <h1 className="text-lg font-display font-800 text-foreground mb-2">Emotional Support</h1>
        <p className="text-sm text-muted-foreground font-body mb-6">You're not alone. We're here for you.</p>

        {/* Motivational card */}
        <motion.div
          className="gradient-primary rounded-2xl p-6 mb-6 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-6 h-6 text-primary-foreground mb-3" />
          <p className="text-primary-foreground font-display font-700 text-lg leading-relaxed">
            "You are stronger than you think. Braver than you believe."
          </p>
          <p className="text-primary-foreground/60 text-xs font-body mt-2">— Daily Motivation</p>
        </motion.div>

        <div className="space-y-3">
          <motion.button
            onClick={() => navigate("/ai-support")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-primary/20 shadow-card text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-display font-700 text-foreground">AI Support Chat</p>
              <p className="text-xs text-muted-foreground font-body">Anonymous • Confidential • 24/7</p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate("/motivational")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-card text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-display font-700 text-foreground">Motivational Messages</p>
              <p className="text-xs text-muted-foreground font-body">Words of encouragement & strength</p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate("/helpline")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-card text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-display font-700 text-foreground">Helpline Numbers</p>
              <p className="text-xs text-muted-foreground font-body">Emergency contacts & helplines</p>
            </div>
          </motion.button>
        </div>

        {/* Relaxation tips - interactive */}
        <div className="mt-6 mb-4">
          <h2 className="text-sm font-display font-700 text-foreground mb-3">Relaxation Exercises</h2>
          <div className="grid grid-cols-2 gap-3">
            {relaxationTips.map((tip, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveTip(i)}
                className="p-4 rounded-2xl bg-secondary text-center flex flex-col items-center gap-2 active:scale-95 transition-transform"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                <tip.icon className="w-5 h-5 text-primary" />
                <p className="text-xs font-body font-600 text-secondary-foreground">{tip.title}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Relaxation tip detail overlay */}
        <AnimatePresence>
          {activeTip !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTip(null)}
            >
              <motion.div
                className="w-full max-w-md bg-card rounded-t-3xl p-6 shadow-elevated"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      {(() => {
                        const TipIcon = relaxationTips[activeTip].icon;
                        return <TipIcon className="w-5 h-5 text-primary" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-sm font-display font-800 text-foreground">
                        {relaxationTips[activeTip].title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-body">
                        {relaxationTips[activeTip].description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTip(null)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3">
                  {relaxationTips[activeTip].steps.map((step, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-display font-700 flex items-center justify-center shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      <p className="text-sm font-body text-foreground leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTip(null)}
                  className="w-full mt-6 h-11 gradient-primary text-primary-foreground font-display font-700 text-sm rounded-2xl shadow-card"
                >
                  I feel better now 💛
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
};

export default SupportScreen;
