import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/safeshe-logo.png";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 3,
  duration: 3 + Math.random() * 3,
  size: 3 + Math.random() * 5,
}));

const SplashScreen = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2400);
    const navTimer = setTimeout(() => navigate("/welcome"), 3000);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="min-h-screen gradient-hero flex flex-col items-center justify-center relative overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {/* Floating particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-primary-foreground/20 animate-particle-rise"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}

          {/* Large ambient orbs */}
          <motion.div
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-primary-foreground/8 blur-[120px] animate-glow-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-primary-foreground/5 blur-[80px] animate-float-slow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Shield glow ring */}
          <motion.div
            className="absolute w-[180px] h-[180px] rounded-full border border-primary-foreground/10 z-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
          />
          <motion.div
            className="absolute w-[240px] h-[240px] rounded-full border border-primary-foreground/5 z-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.3 }}
          />

          {/* Logo with glow */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
          >
            <div className="absolute inset-[-30px] rounded-full bg-primary-foreground/15 blur-3xl animate-glow-pulse" />
            <div className="w-28 h-28 rounded-[28px] bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/15 shadow-2xl">
              <img src={logo} alt="SafeShe" className="w-20 h-20 relative z-10 drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* App name with shimmer */}
          <motion.div
            className="mt-6 relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <h1 className="text-[36px] font-display font-900 text-primary-foreground tracking-tight">
              Safe
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/70 to-primary-foreground bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
                She
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-primary-foreground/50 font-body text-[13px] mt-1.5 relative z-10 font-600 tracking-[0.15em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Your Safety, Your Power
          </motion.p>

          {/* Elegant progress bar */}
          <motion.div
            className="mt-14 relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="w-[180px] h-[3px] rounded-full bg-primary-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-foreground/40 via-primary-foreground/80 to-primary-foreground/40 animate-progress-fill"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <motion.div
              className="flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom branding */}
          <motion.p
            className="absolute bottom-8 text-primary-foreground/25 text-[10px] font-body font-500 tracking-widest uppercase z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Women Safety App
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
