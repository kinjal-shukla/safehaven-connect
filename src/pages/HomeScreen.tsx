import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, Zap, BookOpen, PhoneCall, Bell, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import logo from "@/assets/safeshe-logo.png";

const quickActions = [
  { icon: Phone, label: "Contacts", path: "/contacts", color: "from-pink-500 to-rose-400" },
  { icon: MapPin, label: "Track", path: "/live-tracking", color: "from-violet-500 to-purple-400" },
  { icon: PhoneCall, label: "Fake Call", path: "/fake-call", color: "from-orange-400 to-amber-400" },
  { icon: Shield, label: "Shake SOS", path: "/shake-sos", color: "from-red-500 to-rose-400" },
  { icon: BookOpen, label: "Safety Tips", path: "/safety-tips", color: "from-teal-400 to-emerald-400" },
  { icon: Zap, label: "Helpline", path: "/helpline", color: "from-amber-400 to-orange-400" },
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
      <div className="px-5 pt-5 pb-3">
        {/* Header — Airbnb-style minimal */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="SafeShe" className="w-9 h-9" />
            <div>
              <h1 className="text-[17px] font-display font-800 text-foreground leading-tight">SafeShe</h1>
              <p className="text-[10px] text-muted-foreground font-body font-500">Stay Safe, Stay Strong</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/notifications")}
              className="w-10 h-10 rounded-xl bg-card shadow-card border border-border/50 flex items-center justify-center relative"
            >
              <Bell className="w-[18px] h-[18px] text-foreground" />
              <div className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center">
                <span className="text-[9px] font-700 text-primary-foreground">2</span>
              </div>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow/40"
            >
              <span className="text-[13px] font-display font-800 text-primary-foreground">A</span>
            </button>
          </div>
        </motion.div>

        {/* SOS Button — Clean, premium, Instagram-style */}
        <motion.div
          className="flex justify-center my-5"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.15 }}
        >
          <div className="relative">
            {/* Subtle pulse rings */}
            <div className="absolute inset-[-16px] rounded-full border-2 border-sos/15 animate-ripple" />
            <div className="absolute inset-[-16px] rounded-full border-2 border-sos/10 animate-ripple" style={{ animationDelay: "0.6s" }} />
            
            <button
              onClick={() => navigate("/sos")}
              className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-b from-red-500 to-rose-600 flex flex-col items-center justify-center shadow-sos-glow z-10 active:scale-95 transition-transform duration-150"
            >
              <span className="text-[28px] font-display font-900 text-primary-foreground tracking-wide">SOS</span>
              <span className="text-[9px] text-primary-foreground/70 font-body font-500 mt-0.5">Tap for Help</span>
            </button>
          </div>
        </motion.div>

        {/* Map Preview — Uber-style card */}
        <motion.div
          className="rounded-2xl overflow-hidden mb-5 bg-card shadow-card border border-border/50"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-[120px] relative overflow-hidden">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0"
              title="Location"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent pointer-events-none" />
          </div>
          <button
            onClick={() => navigate("/live-tracking")}
            className="w-full py-2.5 text-center text-[13px] font-display font-700 text-primary flex items-center justify-center gap-0.5 hover:bg-muted/50 transition-colors active:bg-muted"
          >
            Open Live Tracking <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Quick Actions — Clean grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-[13px] font-display font-700 text-foreground mb-3 uppercase tracking-wider">
            Safety Tools
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="rounded-2xl p-3 flex flex-col items-center gap-2 bg-card shadow-card border border-border/40 transition-all active:scale-95 hover:shadow-elevated"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.04 }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-[18px] h-[18px] text-primary-foreground" />
                </div>
                <span className="text-[11px] font-body font-600 text-foreground">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default HomeScreen;
