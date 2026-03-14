import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, MapPin, Heart, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import welcomeImg from "@/assets/welcome-illustration.png";

const slides = [
  {
    icon: Shield,
    title: "Instant SOS Alert",
    desc: "Send emergency alerts to your trusted contacts with just one tap. Your safety is always one touch away.",
    color: "from-primary to-primary/80",
  },
  {
    icon: MapPin,
    title: "Live Location Sharing",
    desc: "Share your real-time location with family and friends. They'll always know you're safe.",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: Phone,
    title: "Fake Call & Shake SOS",
    desc: "Trigger a fake call to escape uncomfortable situations or shake your phone for silent SOS.",
    color: "from-orange-400 to-amber-400",
  },
  {
    icon: Heart,
    title: "24/7 AI Support",
    desc: "Get emotional support, safety tips, and helpline access anytime you need it.",
    color: "from-teal-400 to-emerald-400",
  },
];

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full blur-[100px] opacity-30"
        style={{ background: `hsl(var(--primary))` }}
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="absolute bottom-40 -left-20 w-[200px] h-[200px] rounded-full bg-accent/40 blur-[80px]" />

      {/* Skip button */}
      <motion.button
        onClick={() => navigate("/login")}
        className="absolute top-12 right-5 z-20 text-[13px] font-body font-600 text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full bg-muted/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Skip
      </motion.button>

      <div className="flex-1 flex flex-col px-6 pt-16 pb-6 relative z-10">
        {/* Hero illustration with animated glow */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-[-24px] rounded-full bg-primary/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="w-44 h-44 rounded-[32px] bg-gradient-to-br from-primary/5 to-accent/20 flex items-center justify-center border border-border/30 shadow-elevated">
              <img
                src={welcomeImg}
                alt="Safety illustration"
                className="w-36 h-36 object-contain relative z-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Animated slide content */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="text-center mb-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              {/* Feature icon badge */}
              <motion.div
                className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-glow"
                style={{
                  backgroundImage: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
              >
                <slide.icon className="w-7 h-7 text-primary-foreground" />
              </motion.div>

              <h1 className="text-[26px] font-display font-900 text-foreground tracking-tight leading-tight mb-2.5">
                {slide.title}
              </h1>
              <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[300px] mx-auto font-body font-500">
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-auto mb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="relative py-2"
              >
                <div
                  className={`h-[5px] rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-primary shadow-glow"
                      : "w-[5px] bg-muted-foreground/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <motion.div
        className="px-6 pb-10 space-y-3 relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={() => {
            if (isLast) {
              navigate("/login");
            } else {
              setCurrent((p) => p + 1);
            }
          }}
          className="w-full gradient-primary text-primary-foreground font-display font-700 text-[15px] rounded-2xl shadow-glow hover:shadow-elevated transition-all duration-300 active:scale-[0.98] group"
          style={{ height: 54 }}
        >
          {isLast ? "Get Started" : "Next"}
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Button>

        {isLast && (
          <motion.button
            onClick={() => navigate("/login")}
            className="w-full text-center text-[13px] font-body font-600 text-muted-foreground hover:text-foreground transition-colors py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Already have an account?{" "}
            <span className="text-primary font-700">Log in</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
