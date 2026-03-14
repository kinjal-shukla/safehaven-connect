import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Shield, Zap, BookOpen, PhoneCall,
  Bell, ChevronRight, MessageCircle, Sparkles,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import logo from "@/assets/safeshe-logo.png";

const quickActions = [
  { icon: Phone, label: "Contacts", path: "/contacts", gradient: "from-pink-500 to-rose-400", bg: "bg-pink-50" },
  { icon: MapPin, label: "Live Track", path: "/live-tracking", gradient: "from-violet-500 to-purple-400", bg: "bg-violet-50" },
  { icon: PhoneCall, label: "Fake Call", path: "/fake-call", gradient: "from-orange-400 to-amber-400", bg: "bg-orange-50" },
  { icon: Shield, label: "Shake SOS", path: "/shake-sos", gradient: "from-red-500 to-rose-400", bg: "bg-red-50" },
  { icon: BookOpen, label: "Safety Tips", path: "/safety-tips", gradient: "from-teal-400 to-emerald-400", bg: "bg-teal-50" },
  { icon: Zap, label: "Helpline", path: "/helpline", gradient: "from-amber-500 to-orange-400", bg: "bg-amber-50" },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Good morning");
  const [position, setPosition] = useState({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

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
      <div className="px-5 pt-4 pb-4">
        {/* ─── Header ─── */}
        <motion.div
          className="flex items-center justify-between mb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <img src={logo} alt="SafeShe" className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body font-500">{greeting} 👋</p>
              <h1 className="text-[18px] font-display font-900 text-foreground leading-tight tracking-tight">Amira</h1>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={() => navigate("/notifications")}
              className="w-11 h-11 rounded-2xl glass border border-border/40 flex items-center justify-center relative shadow-soft"
              whileTap={{ scale: 0.92 }}
            >
              <Bell className="w-[19px] h-[19px] text-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sos flex items-center justify-center shadow-sm">
                <span className="text-[9px] font-800 text-primary-foreground">3</span>
              </span>
            </motion.button>
            <motion.button
              onClick={() => navigate("/profile")}
              className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-glow/20"
              whileTap={{ scale: 0.92 }}
            >
              <div className="w-full h-full gradient-primary flex items-center justify-center">
                <span className="text-[14px] font-display font-900 text-primary-foreground">A</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* ─── Safety Status Card ─── */}
        <motion.div
          className="rounded-[20px] p-4 mb-5 gradient-primary relative overflow-hidden shadow-glow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 w-[140px] h-[140px] rounded-full bg-primary-foreground/8 blur-[50px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[80px] h-[80px] rounded-full bg-primary-foreground/5 blur-[30px] translate-y-1/2 -translate-x-1/4" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/10">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-body font-600 text-primary-foreground/70 uppercase tracking-wider">Protected</span>
              </div>
              <p className="text-[15px] font-display font-800 text-primary-foreground leading-tight">All safety features active</p>
            </div>
            <Sparkles className="w-5 h-5 text-primary-foreground/40" />
          </div>
        </motion.div>

        {/* ─── SOS Button ─── */}
        <motion.div
          className="flex justify-center my-6"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
        >
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-[-20px] rounded-full border-2 border-sos/12 animate-ripple" />
            <div className="absolute inset-[-20px] rounded-full border-2 border-sos/8 animate-ripple" style={{ animationDelay: "0.5s" }} />
            <div className="absolute inset-[-20px] rounded-full border border-sos/5 animate-ripple" style={{ animationDelay: "1s" }} />

            {/* Outer glow */}
            <div className="absolute inset-[-8px] rounded-full bg-sos/15 blur-xl animate-glow-pulse" />

            <motion.button
              onClick={() => navigate("/sos")}
              className="relative w-[130px] h-[130px] rounded-full flex flex-col items-center justify-center z-10"
              style={{
                background: "linear-gradient(145deg, hsl(0, 78%, 55%), hsl(0, 78%, 42%))",
                boxShadow: "0 8px 40px -8px hsl(0 78% 50% / 0.5), inset 0 1px 0 hsl(0 78% 65% / 0.3), inset 0 -2px 0 hsl(0 78% 35% / 0.3)",
              }}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-[32px] font-display font-900 text-primary-foreground tracking-wider">SOS</span>
              <span className="text-[10px] text-primary-foreground/60 font-body font-600 mt-0.5">Tap for Help</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ─── Map Preview ─── */}
        <motion.div
          className="rounded-[20px] overflow-hidden mb-5 bg-card border border-border/40 shadow-elevated"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="h-[110px] relative overflow-hidden">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0 pointer-events-none"
              title="Your location"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 flex items-center gap-1.5 glass-dark px-2.5 py-1 rounded-full">
              <MapPin className="w-3 h-3 text-primary-foreground" />
              <span className="text-[10px] text-primary-foreground font-body font-600">Live Location</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/live-tracking")}
            className="w-full py-3 text-center text-[13px] font-display font-700 text-primary flex items-center justify-center gap-1 hover:bg-muted/40 transition-colors active:bg-muted/60"
          >
            Open Live Tracking <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* ─── Safety Tools Grid ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-display font-800 text-foreground">Safety Tools</h2>
            <span className="text-[11px] font-body font-500 text-muted-foreground">{quickActions.length} tools</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`rounded-[18px] p-3.5 flex flex-col items-center gap-2.5 ${action.bg} border border-border/30 transition-all active:scale-[0.94] hover:shadow-elevated`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileTap={{ scale: 0.94 }}
              >
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <action.icon className="w-[20px] h-[20px] text-primary-foreground" />
                </div>
                <span className="text-[11px] font-display font-700 text-foreground">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ─── AI Support Banner ─── */}
        <motion.button
          onClick={() => navigate("/ai-support")}
          className="w-full mt-5 rounded-[18px] p-4 glass border border-border/40 flex items-center gap-3.5 shadow-soft active:scale-[0.98] transition-transform"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-left flex-1">
            <p className="text-[13px] font-display font-800 text-foreground">AI Safety Assistant</p>
            <p className="text-[11px] font-body font-500 text-muted-foreground">Get instant support & safety advice</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </MobileLayout>
  );
};

export default HomeScreen;
