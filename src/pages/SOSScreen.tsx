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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background relative overflow-hidden">
      {/* Ambient red pulse */}
      {!activated && (
        <motion.div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 45%, hsl(0 78% 50% / 0.06) 0%, transparent 70%)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Cancel */}
      {!activated && (
        <motion.button
          onClick={() => navigate("/home")}
          className="absolute top-6 right-5 w-10 h-10 rounded-xl bg-card shadow-card border border-border/50 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-[18px] h-[18px] text-muted-foreground" />
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.div
            key="countdown"
            className="flex flex-col items-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative">
              {/* Minimal pulse rings */}
              <div className="absolute inset-[-20px] rounded-full border-2 border-sos/20 animate-ripple" />
              <div className="absolute inset-[-20px] rounded-full border border-sos/10 animate-ripple" style={{ animationDelay: "0.5s" }} />

              <motion.div
                className="w-40 h-40 rounded-full bg-gradient-to-b from-red-500 to-rose-600 flex items-center justify-center shadow-sos-glow"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span
                  key={countdown}
                  className="text-[64px] font-display font-900 text-primary-foreground"
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                >
                  {countdown}
                </motion.span>
              </motion.div>
            </div>

            <p className="mt-8 text-foreground font-display font-800 text-xl tracking-tight">Sending SOS...</p>
            <p className="text-muted-foreground text-[13px] mt-1 font-body font-500">Tap cancel to stop</p>

            <motion.button
              onClick={() => navigate("/home")}
              className="mt-8 px-10 py-3 rounded-2xl border-2 border-sos/50 text-sos font-display font-700 text-[14px] hover:bg-sos/5 transition-colors active:scale-95"
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="activated"
            className="flex flex-col items-center w-full relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Success icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-5 shadow-elevated"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <h1 className="text-[22px] font-display font-900 text-foreground tracking-tight">Alert Sent!</h1>
            <p className="text-muted-foreground text-[13px] text-center mt-1.5 mb-7 font-body font-500 max-w-[260px]">
              Your emergency contacts have been notified with your location.
            </p>

            <div className="w-full space-y-2">
              {[
                { icon: MapPin, text: "Location captured", color: "from-violet-500 to-purple-500" },
                { icon: MessageSquare, text: "SMS sent to contacts", color: "from-pink-500 to-rose-500" },
                { icon: Users, text: "Contacts notified", color: "from-orange-400 to-amber-400" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-card shadow-card border border-border/40"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-[13px] font-body font-600 text-foreground flex-1">{item.text}</span>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => navigate("/live-tracking")}
              className="mt-6 w-full gradient-primary text-primary-foreground font-display font-700 text-[15px] rounded-2xl shadow-glow active:scale-[0.98] transition-transform"
              style={{ height: 52 }}
            >
              View Live Tracking
            </motion.button>
            <button
              onClick={() => navigate("/home")}
              className="mt-3 text-muted-foreground text-[13px] font-body font-500 hover:text-foreground transition-colors py-2"
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
