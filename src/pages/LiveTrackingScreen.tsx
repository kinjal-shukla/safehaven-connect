import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, Copy, Check } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { toast } from "@/hooks/use-toast";

const LiveTrackingScreen = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 12.9716, lng: 77.5946 });
  const [locationName, setLocationName] = useState("Fetching location...");
  const [shared, setShared] = useState(false);

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

  const handleShare = async () => {
    const url = `https://www.google.com/maps?q=${position.lat},${position.lng}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Live Location - SafeShe",
          text: "Here's my live location. Stay safe!",
          url,
        });
        toast({ title: "Location shared!", description: "Your contacts have been notified." });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        toast({ title: "Link copied!", description: "Location link copied to clipboard." });
        setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      // User cancelled share dialog — not an error
      if ((err as Error)?.name !== "AbortError") {
        await navigator.clipboard.writeText(url);
        setShared(true);
        toast({ title: "Link copied!", description: "Location link copied to clipboard." });
        setTimeout(() => setShared(false), 2000);
      }
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
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-card rounded-t-3xl p-6 shadow-elevated">
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-display font-700 text-foreground">Location Active</p>
              <p className="text-xs text-muted-foreground font-body">{locationName}</p>
            </div>
            <button
              onClick={() => {
                const url = `https://www.google.com/maps?q=${position.lat},${position.lng}`;
                navigator.clipboard.writeText(url);
                setShared(true);
                toast({ title: "Link copied!" });
                setTimeout(() => setShared(false), 2000);
              }}
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
            >
              {shared ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
          <button
            onClick={handleShare}
            className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card active:scale-[0.98] transition-transform"
          >
            {shared ? "✓ Link Copied!" : "Share Location"}
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LiveTrackingScreen;
