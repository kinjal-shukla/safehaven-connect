import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, Zap, BookOpen, PhoneCall } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import logo from "@/assets/safeshe-logo.png";

const quickActions = [
  { icon: Phone, label: "Contacts", path: "/contacts", color: "bg-accent" },
  { icon: MapPin, label: "Track", path: "/live-tracking", color: "bg-secondary" },
  { icon: PhoneCall, label: "Fake Call", path: "/fake-call", color: "bg-accent" },
  { icon: Shield, label: "Shake SOS", path: "/shake-sos", color: "bg-secondary" },
  { icon: BookOpen, label: "Tips", path: "/safety-tips", color: "bg-accent" },
  { icon: Zap, label: "Helpline", path: "/helpline", color: "bg-secondary" },
];

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SafeShe" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-display font-800 text-foreground">SafeShe</h1>
              <p className="text-xs text-muted-foreground">Stay Safe, Stay Strong</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"
          >
            <span className="text-sm font-display font-700 text-accent-foreground">A</span>
          </button>
        </div>

        {/* SOS Button */}
        <motion.div
          className="flex justify-center my-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sos opacity-20 animate-ripple" />
            <div className="absolute inset-0 rounded-full bg-sos opacity-10 animate-ripple" style={{ animationDelay: "0.5s" }} />
            <button
              onClick={() => navigate("/sos")}
              className="relative w-36 h-36 rounded-full bg-sos flex flex-col items-center justify-center shadow-sos animate-pulse-sos z-10"
            >
              <span className="text-3xl font-display font-900 text-sos-foreground">SOS</span>
              <span className="text-[10px] text-sos-foreground/80 font-body mt-1">Tap for Help</span>
            </button>
          </div>
        </motion.div>

        {/* Map Preview */}
        <motion.div
          className="rounded-2xl overflow-hidden mb-6 shadow-card border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="h-36 bg-accent relative flex items-center justify-center">
            <MapPin className="w-8 h-8 text-primary" />
            <p className="text-xs text-muted-foreground ml-2 font-body">Live location preview</p>
          </div>
          <button
            onClick={() => navigate("/live-tracking")}
            className="w-full py-3 text-center text-sm font-display font-600 text-primary bg-card"
          >
            Open Live Tracking →
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-sm font-display font-700 text-foreground mb-3">Safety Tools</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`${action.color} rounded-2xl p-4 flex flex-col items-center gap-2 shadow-card transition-transform active:scale-95`}
              >
                <action.icon className="w-6 h-6 text-primary" />
                <span className="text-xs font-body font-600 text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default HomeScreen;
