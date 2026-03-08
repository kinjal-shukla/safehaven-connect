import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, MapPin, Navigation } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const LiveTrackingScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-display font-700 text-foreground">Live Tracking</h1>
          <button className="w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center">
            <Share2 className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Map placeholder */}
        <div className="h-[70vh] bg-accent flex items-center justify-center relative">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-card animate-pulse-sos">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-body">Your current location</p>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="bg-card rounded-t-3xl -mt-6 relative z-10 p-6 shadow-elevated">
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-display font-700 text-foreground">Location Active</p>
              <p className="text-xs text-muted-foreground font-body">Sharing with 3 contacts</p>
            </div>
          </div>
          <button className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card">
            Share Location
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LiveTrackingScreen;
