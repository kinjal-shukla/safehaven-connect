import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, PhoneOff, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FakeCallScreen = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen gradient-splash flex flex-col items-center justify-between py-16 px-8">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="incoming"
            className="flex flex-col items-center flex-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-card/20 flex items-center justify-center mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <User className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-display font-800 text-primary-foreground mb-1">Mom</h1>
            <p className="text-primary-foreground/70 font-body text-sm mb-2">Incoming Call...</p>
            <p className="text-primary-foreground/50 font-body text-xs">+91 98765 43210</p>
          </motion.div>
        ) : (
          <motion.div
            key="connected"
            className="flex flex-col items-center flex-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-card/20 flex items-center justify-center mb-6">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-800 text-primary-foreground mb-1">Mom</h1>
            <p className="text-primary-foreground/70 font-body text-sm">Connected 0:12</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-8">
        {!accepted && (
          <motion.button
            onClick={() => setAccepted(true)}
            className="w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-elevated"
            whileTap={{ scale: 0.9 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Phone className="w-7 h-7 text-primary" />
          </motion.button>
        )}
        <button
          onClick={() => navigate("/home")}
          className="w-16 h-16 rounded-full bg-sos flex items-center justify-center shadow-sos"
        >
          <PhoneOff className="w-7 h-7 text-sos-foreground" />
        </button>
      </div>
    </div>
  );
};

export default FakeCallScreen;
