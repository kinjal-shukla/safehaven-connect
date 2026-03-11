import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/safeshe-logo.png";

const FloatingOrb = ({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
    }}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.15, 1],
      opacity: [0.4, 0.7, 0.4],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/welcome"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Floating orbs */}
      <FloatingOrb delay={0} size={120} x="10%" y="15%" />
      <FloatingOrb delay={1} size={80} x="75%" y="25%" />
      <FloatingOrb delay={0.5} size={60} x="20%" y="70%" />
      <FloatingOrb delay={1.5} size={100} x="70%" y="65%" />
      <FloatingOrb delay={2} size={40} x="50%" y="85%" />

      {/* Logo with glow */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="absolute inset-0 blur-2xl opacity-50 bg-primary-foreground rounded-full scale-150" />
        <img src={logo} alt="SafeShe Logo" className="w-28 h-28 relative z-10 drop-shadow-2xl" />
      </motion.div>

      <motion.h1
        className="text-4xl font-display font-900 text-primary-foreground mt-6 mb-2 relative z-10 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        SafeShe
      </motion.h1>
      <motion.p
        className="text-primary-foreground/70 font-body text-sm relative z-10 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Your Safety Companion
      </motion.p>

      {/* Loading dots */}
      <motion.div
        className="flex gap-2 mt-14 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary-foreground/60"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SplashScreen;
