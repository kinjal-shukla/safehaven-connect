import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/safeshe-logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/welcome"), 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center relative overflow-hidden">
      {/* Soft ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-white/10 blur-[100px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-white/5 blur-[80px]" />

      {/* Logo */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
      >
        <div className="absolute inset-[-20px] rounded-full bg-white/10 blur-2xl" />
        <img src={logo} alt="SafeShe" className="w-24 h-24 relative z-10 drop-shadow-2xl" />
      </motion.div>

      <motion.h1
        className="text-3xl font-display font-900 text-primary-foreground mt-5 relative z-10 tracking-tight"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        SafeShe
      </motion.h1>
      <motion.p
        className="text-primary-foreground/60 font-body text-[13px] mt-1 relative z-10 font-500 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Your Safety, Your Power
      </motion.p>

      {/* Minimal loading bar */}
      <motion.div
        className="mt-12 w-16 h-1 rounded-full bg-white/20 overflow-hidden relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-white/70 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.1, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
