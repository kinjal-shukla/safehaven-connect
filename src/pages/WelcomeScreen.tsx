import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import welcomeImg from "@/assets/welcome-illustration.png";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-8 py-12">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.img
          src={welcomeImg}
          alt="Woman safety illustration"
          className="w-64 h-64 object-contain mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-display font-800 text-foreground">SafeShe</h1>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Your personal safety companion. Stay protected with instant SOS alerts, live tracking, and emotional support.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="w-full space-y-3 mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => navigate("/login")}
          className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 text-base rounded-2xl shadow-card"
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          className="w-full h-12 border-primary text-primary font-display font-700 text-base rounded-2xl"
        >
          Sign Up
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
