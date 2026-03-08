import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/safeshe-logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/welcome"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-splash flex flex-col items-center justify-center px-8">
      <motion.img
        src={logo}
        alt="SafeShe Logo"
        className="w-28 h-28 mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
      <motion.h1
        className="text-3xl font-display font-900 text-primary-foreground mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        SafeShe
      </motion.h1>
      <motion.p
        className="text-primary-foreground/80 font-body text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Your Safety Companion
      </motion.p>
      <motion.div
        className="mt-12 w-8 h-8 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ borderWidth: 3 }}
      />
    </div>
  );
};

export default SplashScreen;
