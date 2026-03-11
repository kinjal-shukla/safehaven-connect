import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import welcomeImg from "@/assets/welcome-illustration.png";

const features = [
  { icon: Shield, title: "Instant SOS", desc: "One-tap emergency alert" },
  { icon: MapPin, title: "Live Tracking", desc: "Share real-time location" },
  { icon: Heart, title: "24/7 Support", desc: "Always here for you" },
];

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full bg-primary/6 blur-[80px]" />
      <div className="absolute bottom-32 left-0 w-[200px] h-[200px] rounded-full bg-accent/30 blur-[60px]" />

      <div className="flex-1 flex flex-col px-6 pt-14 pb-8 relative z-10">
        {/* Hero illustration */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-[-16px] rounded-full bg-primary/8 blur-2xl" />
            <img
              src={welcomeImg}
              alt="Safety illustration"
              className="w-48 h-48 object-contain relative z-10"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-[28px] font-display font-900 text-foreground tracking-tight leading-tight">
            Your Safety,{" "}
            <span className="bg-clip-text text-transparent gradient-primary">First</span>
          </h1>
          <p className="text-muted-foreground text-[14px] mt-2.5 leading-relaxed max-w-[300px] mx-auto font-body font-500">
            Stay protected with instant alerts, live tracking, and a supportive community.
          </p>
        </motion.div>

        {/* Feature cards — Uber-style horizontal list */}
        <motion.div
          className="space-y-2.5 mb-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-card shadow-card border border-border/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow/30 flex-shrink-0">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-[13px] font-display font-700 text-foreground">{f.title}</p>
                <p className="text-[11px] font-body font-500 text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTAs */}
      <motion.div
        className="px-6 pb-10 space-y-3 relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Button
          onClick={() => navigate("/login")}
          className="w-full gradient-primary text-primary-foreground font-display font-700 text-[15px] rounded-2xl shadow-glow hover:shadow-elevated transition-all duration-300 active:scale-[0.98]"
          style={{ height: 52 }}
        >
          Get Started
        </Button>
        <button
          onClick={() => navigate("/login")}
          className="w-full text-center text-[13px] font-body font-600 text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Already have an account? <span className="text-primary font-700">Log in</span>
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
