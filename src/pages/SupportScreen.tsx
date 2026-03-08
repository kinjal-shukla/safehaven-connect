import { useNavigate } from "react-router-dom";
import { Heart, Phone, Sparkles, Bot } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";

const SupportScreen = () => {
  const navigate = useNavigate();

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

        {/* Relaxation tips */}
        <div className="mt-6">
          <h2 className="text-sm font-display font-700 text-foreground mb-3">Relaxation Tips</h2>
          <div className="grid grid-cols-2 gap-3">
            {["Deep Breathing", "Meditation", "Journaling", "Talk to Someone"].map((tip, i) => (
              <div key={i} className="p-4 rounded-2xl bg-secondary text-center">
                <p className="text-xs font-body font-600 text-secondary-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SupportScreen;
