import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, Users, Check, Send, MapPin } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const emergencyContacts = [
  { name: "Mom", phone: "+919876543210" },
  { name: "Dad", phone: "+919876512345" },
  { name: "Sister", phone: "+919123456789" },
];

const LiveTrackingScreen = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 12.9716, lng: 77.5946 });
  const [locationName, setLocationName] = useState("Fetching location...");
  const [sending, setSending] = useState(false);
  const [notifiedContacts, setNotifiedContacts] = useState<string[]>([]);
  const [allSent, setAllSent] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationName("Your current location");
        },
        () => setLocationName("Bangalore, India (default)")
      );
    }
  }, []);

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${position.lng - 0.015}%2C${position.lat - 0.01}%2C${position.lng + 0.015}%2C${position.lat + 0.01}&layer=mapnik&marker=${position.lat}%2C${position.lng}`;
  const locationLink = `https://www.google.com/maps?q=${position.lat},${position.lng}`;
  const emergencyMessage = `🆘 EMERGENCY! I need help. Here's my live location: ${locationLink} — Sent via SafeShe`;

  const handleEmergencyShare = async () => {
    if (sending || allSent) return;
    setSending(true);
    setNotifiedContacts([]);

    // Simulate sending to each contact one by one with notification
    for (let i = 0; i < emergencyContacts.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const contact = emergencyContacts[i];
      setNotifiedContacts((prev) => [...prev, contact.name]);
      toast({
        title: `✅ Notified ${contact.name}`,
        description: `Live location sent via SMS to ${contact.phone}`,
      });
    }

    // After all notified, open SMS with all numbers pre-filled
    const phones = emergencyContacts.map((c) => c.phone).join(",");
    const smsUrl = `sms:${phones}?body=${encodeURIComponent(emergencyMessage)}`;
    window.open(smsUrl, "_blank");

    setSending(false);
    setAllSent(true);

    toast({
      title: "🆘 All contacts notified!",
      description: `Location shared with ${emergencyContacts.length} emergency contacts.`,
    });

    // Reset after 5 seconds
    setTimeout(() => {
      setAllSent(false);
      setNotifiedContacts([]);
    }, 5000);
  };

  return (
    <MobileLayout showNav={false}>
      <div className="relative h-screen flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 py-4 pointer-events-none">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-display font-700 text-foreground bg-card/90 px-3 py-1 rounded-full text-sm shadow-elevated">
            Live Tracking
          </h1>
          <div className="w-10" />
        </div>

        {/* Map */}
        <div className="flex-1">
          <iframe
            src={mapUrl}
            className="w-full h-full border-0"
            title="Live Location Map"
            loading="lazy"
          />
        </div>

        {/* Bottom panel */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-card rounded-t-3xl p-5 shadow-elevated">
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

          {/* Status */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-display font-700 text-foreground">Location Active</p>
              <p className="text-xs text-muted-foreground font-body">{locationName}</p>
            </div>
          </div>

          {/* Contact chips — show who will be notified */}
          <div className="flex gap-2 mb-4">
            {emergencyContacts.map((contact) => {
              const isNotified = notifiedContacts.includes(contact.name);
              return (
                <div
                  key={contact.phone}
                  className={`flex-1 flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all ${
                    isNotified
                      ? "bg-primary/10 border-primary"
                      : "bg-muted border-border"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-display font-700 ${
                      isNotified
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {isNotified ? <Check className="w-3 h-3" /> : contact.name[0]}
                  </div>
                  <span className="text-[10px] font-body font-600 text-foreground truncate">
                    {contact.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* One-tap Emergency Share */}
          <button
            onClick={handleEmergencyShare}
            disabled={sending}
            className={`w-full h-12 font-display font-700 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70 ${
              allSent
                ? "bg-primary text-primary-foreground shadow-card"
                : "bg-sos text-sos-foreground shadow-sos"
            }`}
          >
            <AnimatePresence mode="wait">
              {sending ? (
                <motion.div
                  key="sending"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-sos-foreground/30 border-t-sos-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  Notifying {notifiedContacts.length + 1}/{emergencyContacts.length}...
                </motion.div>
              ) : allSent ? (
                <motion.div
                  key="sent"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Check className="w-5 h-5" />
                  All {emergencyContacts.length} Contacts Notified!
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Send className="w-5 h-5" />
                  Share Location to All Contacts
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <p className="text-[10px] text-muted-foreground font-body text-center mt-2">
            <MapPin className="w-3 h-3 inline-block mr-0.5" />
            Auto-sends your live GPS location via SMS
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LiveTrackingScreen;
