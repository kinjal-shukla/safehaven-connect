import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, Zap, BookOpen, PhoneCall, Bell, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import logo from "@/assets/safeshe-logo.png";

const quickActions = [
  { icon: Phone, label: "Contacts", path: "/contacts", gradient: "from-pink-500 to-rose-400" },
  { icon: MapPin, label: "Track", path: "/live-tracking", gradient: "from-violet-500 to-purple-400" },
  { icon: PhoneCall, label: "Fake Call", path: "/fake-call", gradient: "from-orange-400 to-pink-500" },
  { icon: Shield, label: "Shake SOS", path: "/shake-sos", gradient: "from-red-500 to-rose-400" },
  { icon: BookOpen, label: "Safety Tips", path: "/safety-tips", gradient: "from-teal-400 to-emerald-400" },
  { icon: Zap, label: "Helpline", path: "/helpline", gradient: "from-amber-400 to-orange-400" },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  }, []);

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${position.lng - 0.02}%2C${position.lat - 0.012}%2C${position.lng + 0.02}%2C${position.lat + 0.012}&layer=mapnik&marker=${position.lat}%2C${position.lng}`;

  return (
    <MobileLayout>
      <div className="px-5 pt-5 pb-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={logo} alt="SafeShe" className="w-10 h-10 drop-shadow-md" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-background" />
            </div>
            <div>
              <h1 className="text-lg font-display font-800 text-foreground">SafeShe</h1>
              <p className="text-[11px] text-muted-foreground font-body">Stay Safe, Stay Strong</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/notifications")}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center shadow-card relative"
            >
              <Bell className="w-4.5 h-4.5 text-foreground" style={{ width: 18, height: 18 }} />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sos flex items-center justify-center">
                <span className="text-[9px] font-700 text-sos-foreground">2</span>
              </div>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow"
            >
              <span className="text-sm font-display font-700 text-primary-foreground">A</span>
            </button>
          </div>
        </div>

        {/* SOS Button */}
        <motion.div
          className="flex justify-center my-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <div className="relative">
            {/* Multiple ripple rings */}
            <div className="absolute inset-[-12px] rounded-full bg-sos/15 animate-ripple" />
            <div className="absolute inset-[-12px] rounded-full bg-sos/10 animate-ripple" style={{ animationDelay: "0.5s" }} />
            <div className="absolute inset-[-12px] rounded-full bg-sos/5 animate-ripple" style={{ animationDelay: "1s" }} />
            {/* Outer glow ring */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-red-400 to-rose-600 opacity-30 blur-sm" />
            <button
              onClick={() => navigate("/sos")}
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex flex-col items-center justify-center shadow-sos-glow animate-pulse-sos z-10 border-4 border-red-400/30"
            >
              <span className="text-3xl font-display font-900 text-sos-foreground drop-shadow-md">SOS</span>
              <span className="text-[10px] text-sos-foreground/80 font-body mt-0.5">Tap for Help</span>
            </button>
          </div>
        </motion.div>

        {/* Map Preview */}
        <motion.div
          className="rounded-2xl overflow-hidden mb-5 shadow-elevated border border-border/50 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="h-32 relative overflow-hidden">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0"
              title="Location Preview"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
          <button
            onClick={() => navigate("/live-tracking")}
            className="w-full py-2.5 text-center text-sm font-display font-600 text-primary flex items-center justify-center gap-1 hover:bg-primary/5 transition-colors"
          >
            Open Live Tracking <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-sm font-display font-700 text-foreground mb-3">Safety Tools</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="rounded-2xl p-3.5 flex flex-col items-center gap-2 glass shadow-card transition-all active:scale-95 hover:shadow-elevated border border-border/30"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <action.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-body font-600 text-foreground">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default HomeScreen;
