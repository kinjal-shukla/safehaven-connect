import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, MessageSquare, Users, CheckCircle2 } from "lucide-react";

const SOSScreen = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !activated) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !activated) {
      setActivated(true);
    }
  }, [countdown, activated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 bg-background relative overflow-hidden">
      {/* Background pulse effect */}
      {!activated && (
        <motion.div
          className="absolute inset-0 bg-sos/5"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Cancel button */}
      {!activated && (
        <motion.button
          onClick={() => navigate("/home")}
          className="absolute top-8 right-6 w-10 h-10 rounded-xl glass flex items-center justify-center shadow-card z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.div
            key="countdown"
            className="flex flex-col items-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative">
              {/* Multiple animated rings */}
              <div className="absolute inset-[-20px] rounded-full bg-sos/10 animate-ripple" />
              <div className="absolute inset-[-20px] rounded-full bg-sos/8 animate-ripple" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-[-20px] rounded-full bg-sos/5 animate-ripple" style={{ animationDelay: "1s" }} />
              {/* Glow */}
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-red-400 to-rose-600 opacity-25 blur-lg" />
              <motion.div
                className="w-44 h-44 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-sos-glow border-4 border-red-400/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.span
                  key={countdown}
                  className="text-7xl font-display font-900 text-sos-foreground drop-shadow-lg"
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {countdown}
                </motion.span>
              </motion.div>
            </div>
            <p className="mt-8 text-foreground font-display font-800 text-xl">Sending SOS in...</p>
            <p className="text-muted-foreground text-sm mt-1.5 font-body">Tap cancel to stop</p>
            <motion.button
              onClick={() => navigate("/home")}
              className="mt-8 px-10 py-3.5 rounded-2xl border-2 border-sos/60 text-sos font-display font-700 glass hover:bg-sos/5 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="activated"
            className="flex flex-col items-center w-full relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-5 shadow-elevated"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-display font-900 text-foreground mb-2">Alert Sent!</h1>
            <p className="text-muted-foreground text-sm text-center mb-8 font-body max-w-[260px]">
              Your emergency contacts have been notified with your live location.
            </p>

            <div className="w-full space-y-2.5">
              {[
                { icon: MapPin, text: "Location captured", color: "from-violet-500 to-purple-500" },
                { icon: MessageSquare, text: "SMS sent to contacts", color: "from-pink-500 to-rose-500" },
                { icon: Users, text: "Contacts notified", color: "from-orange-400 to-pink-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl glass shadow-card border border-border/30"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-body font-600 text-foreground">{item.text}</span>
                  <span className="ml-auto text-emerald-500 font-body font-700">✓</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => navigate("/live-tracking")}
              className="mt-6 w-full h-13 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-glow"
              style={{ height: 52 }}
              whileTap={{ scale: 0.98 }}
            >
              View Live Tracking
            </motion.button>
            <button
              onClick={() => navigate("/home")}
              className="mt-3 text-muted-foreground text-sm font-body hover:text-foreground transition-colors"
            >
              Return to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SOSScreen;
