import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, Users, MessageCircle, Phone, AlertTriangle, Check } from "lucide-react";
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
  const [sent, setSent] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

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

  const sendToAllContacts = () => {
    setSending(true);

    // Open SMS with all contacts pre-filled
    const phones = emergencyContacts.map((c) => c.phone).join(",");
    const smsUrl = `sms:${phones}?body=${encodeURIComponent(emergencyMessage)}`;
    window.open(smsUrl, "_blank");

    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast({
        title: "📍 Location shared!",
        description: `SMS opened for ${emergencyContacts.length} emergency contacts.`,
      });
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  const shareViaWhatsApp = (contact: { name: string; phone: string }) => {
    const waUrl = `https://wa.me/${contact.phone.replace("+", "")}?text=${encodeURIComponent(emergencyMessage)}`;
    window.open(waUrl, "_blank");
    toast({ title: `Sharing with ${contact.name}`, description: "Opening WhatsApp..." });
  };

  const shareViaWhatsAppAll = () => {
    // Open WhatsApp for first contact, show toast for others
    shareViaWhatsApp(emergencyContacts[0]);
    toast({
      title: "📍 Share with all contacts",
      description: "Send to each contact one by one via WhatsApp.",
    });
  };

  const handleEmergencyShare = () => {
    setSending(true);
    // Try native share first (works best on mobile)
    if (navigator.share) {
      navigator
        .share({
          title: "🆘 Emergency - My Live Location",
          text: emergencyMessage,
        })
        .then(() => {
          setSending(false);
          setSent(true);
          toast({ title: "✅ Location shared!", description: "Stay safe." });
          setTimeout(() => setSent(false), 3000);
        })
        .catch(() => {
          setSending(false);
          sendToAllContacts();
        });
    } else {
      sendToAllContacts();
    }
  };

  return (
    <MobileLayout showNav={false}>
      <div className="relative h-screen flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4">
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
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary">
              <Users className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-body font-600 text-primary">{emergencyContacts.length} contacts</span>
            </div>
          </div>

          {/* Emergency Share Button */}
          <button
            onClick={handleEmergencyShare}
            disabled={sending}
            className="w-full h-12 bg-sos text-sos-foreground font-display font-700 rounded-2xl shadow-sos mb-3 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-70"
          >
            {sending ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-sos-foreground/30 border-t-sos-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                />
                Sending...
              </>
            ) : sent ? (
              <>
                <Check className="w-5 h-5" />
                Location Sent to All Contacts!
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5" />
                🆘 Emergency Share to All
              </>
            )}
          </button>

          {/* More options toggle */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="w-full text-center text-xs text-muted-foreground font-body py-1"
          >
            {showOptions ? "Hide options ▲" : "More sharing options ▼"}
          </button>

          {/* Share options */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                className="mt-3 space-y-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {/* SMS to all */}
                <button
                  onClick={sendToAllContacts}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary text-left active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-700 text-foreground">Send SMS to All Contacts</p>
                    <p className="text-[10px] text-muted-foreground font-body">
                      {emergencyContacts.map((c) => c.name).join(", ")}
                    </p>
                  </div>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={shareViaWhatsAppAll}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary text-left active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-700 text-foreground">Share via WhatsApp</p>
                    <p className="text-[10px] text-muted-foreground font-body">Send to contacts one by one</p>
                  </div>
                </button>

                {/* Individual contacts */}
                <div className="flex gap-2 pt-1">
                  {emergencyContacts.map((contact) => (
                    <button
                      key={contact.phone}
                      onClick={() => shareViaWhatsApp(contact)}
                      className="flex-1 flex flex-col items-center gap-1 p-2 rounded-xl bg-accent active:scale-95 transition-transform"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-display font-700 text-primary">{contact.name[0]}</span>
                      </div>
                      <span className="text-[10px] font-body font-600 text-foreground">{contact.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LiveTrackingScreen;
