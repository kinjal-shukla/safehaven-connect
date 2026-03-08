import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, PhoneOff, User, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const callerProfiles = [
  { name: "Mom", number: "+91 98765 43210" },
  { name: "Dad", number: "+91 98765 12345" },
  { name: "Sister", number: "+91 91234 56789" },
];

const FakeCallScreen = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<"ringing" | "connected" | "ended">("ringing");
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [caller] = useState(() => callerProfiles[Math.floor(Math.random() * callerProfiles.length)]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Vibrate on ringing
  useEffect(() => {
    if (state === "ringing" && navigator.vibrate) {
      const interval = setInterval(() => navigator.vibrate([500, 300, 500]), 1800);
      return () => {
        clearInterval(interval);
        navigator.vibrate(0);
      };
    }
  }, [state]);

  // Call timer
  useEffect(() => {
    if (state === "connected") {
      timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [state]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAccept = () => {
    if (navigator.vibrate) navigator.vibrate(0);
    setState("connected");
  };

  const handleEnd = () => {
    if (navigator.vibrate) navigator.vibrate(0);
    setState("ended");
    setTimeout(() => navigate("/home"), 800);
  };

  return (
    <div className="min-h-screen gradient-splash flex flex-col items-center justify-between py-16 px-8">
      <AnimatePresence mode="wait">
        {state === "ringing" && (
          <motion.div
            key="ringing"
            className="flex flex-col items-center flex-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Caller avatar with pulse rings */}
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-0 rounded-full bg-card/10"
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ width: 96, height: 96 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-card/10"
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                style={{ width: 96, height: 96 }}
              />
              <motion.div
                className="relative w-24 h-24 rounded-full bg-card/20 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <User className="w-12 h-12 text-primary-foreground" />
              </motion.div>
            </div>
            <h1 className="text-2xl font-display font-800 text-primary-foreground mb-1">{caller.name}</h1>
            <motion.p
              className="text-primary-foreground/70 font-body text-sm mb-2"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Incoming Call...
            </motion.p>
            <p className="text-primary-foreground/50 font-body text-xs">{caller.number}</p>
          </motion.div>
        )}

        {state === "connected" && (
          <motion.div
            key="connected"
            className="flex flex-col items-center flex-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-card/20 flex items-center justify-center mb-6">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-800 text-primary-foreground mb-1">{caller.name}</h1>
            <p className="text-primary-foreground/70 font-body text-sm font-mono">{formatTime(callDuration)}</p>

            {/* Call controls */}
            <div className="flex gap-6 mt-10">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMuted ? "bg-card/40" : "bg-card/20"
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Mic className="w-5 h-5 text-primary-foreground" />
                )}
              </button>
              <button
                onClick={() => setIsSpeaker(!isSpeaker)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isSpeaker ? "bg-card/40" : "bg-card/20"
                }`}
              >
                {isSpeaker ? (
                  <Volume2 className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <VolumeX className="w-5 h-5 text-primary-foreground" />
                )}
              </button>
            </div>
          </motion.div>
        )}

        {state === "ended" && (
          <motion.div
            key="ended"
            className="flex flex-col items-center flex-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-card/20 flex items-center justify-center mb-6">
              <User className="w-12 h-12 text-primary-foreground/50" />
            </div>
            <h1 className="text-xl font-display font-700 text-primary-foreground/70">Call Ended</h1>
            <p className="text-primary-foreground/50 font-body text-sm mt-1">{formatTime(callDuration)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom buttons */}
      {state !== "ended" && (
        <div className="flex gap-8">
          {state === "ringing" && (
            <motion.button
              onClick={handleAccept}
              className="w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-elevated"
              whileTap={{ scale: 0.9 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Phone className="w-7 h-7 text-primary" />
            </motion.button>
          )}
          <button
            onClick={handleEnd}
            className="w-16 h-16 rounded-full bg-sos flex items-center justify-center shadow-sos"
          >
            <PhoneOff className="w-7 h-7 text-sos-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FakeCallScreen;
