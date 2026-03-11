import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import welcomeImg from "@/assets/welcome-illustration.png";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative gradient blob top */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-accent/40 blur-3xl" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-12 pb-6 relative z-10">
        {/* Illustration with glow */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl scale-110" />
          <img
            src={welcomeImg}
            alt="Woman safety illustration"
            className="w-56 h-56 object-contain relative z-10 drop-shadow-lg"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-900 text-foreground tracking-tight">SafeShe</h1>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mx-auto">
            Your personal safety companion. Stay protected with instant SOS alerts, live tracking, and emotional support.
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {[
            { icon: Shield, text: "SOS Alerts" },
            { icon: Sparkles, text: "AI Support" },
            { icon: Heart, text: "24/7 Helpline" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass border border-primary/10 shadow-card"
            >
              <item.icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-body font-600 text-foreground">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom buttons */}
      <motion.div
        className="px-8 pb-10 space-y-3 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => navigate("/login")}
          className="w-full h-13 gradient-primary text-primary-foreground font-display font-700 text-base rounded-2xl shadow-glow hover:shadow-sos transition-shadow duration-300"
          style={{ height: 52 }}
        >
          Get Started
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          className="w-full h-12 border-primary/30 text-primary font-display font-700 text-base rounded-2xl glass hover:bg-primary/5 transition-all duration-300"
        >
          I already have an account
        </Button>
      </motion.div>

      {/* Decorative gradient blob bottom */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/8 blur-3xl" />
    </div>
  );
};

export default WelcomeScreen;
