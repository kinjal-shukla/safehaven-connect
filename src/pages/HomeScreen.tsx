import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, Zap, BookOpen, PhoneCall } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import logo from "@/assets/safeshe-logo.png";

const userIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:hsl(340,82%,55%);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

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
  const [position, setPosition] = useState<[number, number]>([12.9716, 77.5946]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => {} // keep default
      );
    }
  }, []);

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
          <div className="h-36 relative">
            <MapContainer
              center={position}
              zoom={14}
              className="h-full w-full"
              zoomControl={false}
              attributionControl={false}
              dragging={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              touchZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} icon={userIcon} />
              <Circle
                center={position}
                radius={150}
                pathOptions={{
                  color: "hsl(340, 82%, 55%)",
                  fillColor: "hsl(340, 82%, 55%)",
                  fillOpacity: 0.08,
                  weight: 1,
                }}
              />
            </MapContainer>
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
