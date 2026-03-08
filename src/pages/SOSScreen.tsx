import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, MessageSquare, Users } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center px-8 bg-background relative">
      {/* Cancel button */}
      {!activated && (
        <button
          onClick={() => navigate("/home")}
          className="absolute top-8 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      )}

      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.div
            key="countdown"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-sos opacity-20 animate-ripple" />
              <div className="w-44 h-44 rounded-full bg-sos flex items-center justify-center shadow-sos">
                <span className="text-6xl font-display font-900 text-sos-foreground">{countdown}</span>
              </div>
            </div>
            <p className="mt-6 text-foreground font-display font-700 text-lg">Sending SOS in...</p>
            <p className="text-muted-foreground text-sm mt-1 font-body">Tap cancel to stop</p>
            <button
              onClick={() => navigate("/home")}
              className="mt-8 px-8 py-3 rounded-2xl border-2 border-sos text-sos font-display font-700"
            >
              Cancel
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="activated"
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-sos flex items-center justify-center mb-4">
              <span className="text-2xl font-display font-900 text-sos-foreground">SOS</span>
            </div>
            <h1 className="text-xl font-display font-800 text-foreground mb-2">Alert Sent!</h1>
            <p className="text-muted-foreground text-sm text-center mb-8 font-body">
              Your emergency contacts have been notified with your location.
            </p>

            <div className="w-full space-y-3">
              {[
                { icon: MapPin, text: "Location captured", done: true },
                { icon: MessageSquare, text: "SMS sent to contacts", done: true },
                { icon: Users, text: "Contacts notified", done: true },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-secondary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-body font-600 text-foreground">{item.text}</span>
                  <span className="ml-auto text-xs text-primary font-body font-600">✓</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => navigate("/live-tracking")}
              className="mt-6 w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card"
            >
              View Live Tracking
            </button>
            <button
              onClick={() => navigate("/home")}
              className="mt-3 text-muted-foreground text-sm font-body"
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
