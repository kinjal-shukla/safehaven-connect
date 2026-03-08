import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Navigation } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom pink marker icon
const userIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:20px;height:20px;border-radius:50%;background:hsl(340,82%,55%);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
}

const LiveTrackingScreen = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<[number, number]>([12.9716, 77.5946]); // Default: Bangalore
  const [locationName, setLocationName] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLocationName("Your current location");
        },
        () => {
          setLocationName("Bangalore, India (default)");
        }
      );
    }
  }, []);

  const handleShare = () => {
    const url = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
    if (navigator.share) {
      navigator.share({ title: "My Live Location", text: "Here's my live location", url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <MobileLayout showNav={false}>
      <div className="relative h-screen flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-display font-700 text-foreground bg-card/80 px-3 py-1 rounded-full text-sm shadow-elevated">
            Live Tracking
          </h1>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Map */}
        <div className="flex-1">
          <MapContainer
            center={position}
            zoom={15}
            className="h-full w-full"
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={userIcon} />
            <Circle
              center={position}
              radius={200}
              pathOptions={{
                color: "hsl(340, 82%, 55%)",
                fillColor: "hsl(340, 82%, 55%)",
                fillOpacity: 0.1,
                weight: 2,
              }}
            />
            <RecenterMap lat={position[0]} lng={position[1]} />
          </MapContainer>
        </div>

        {/* Bottom panel */}
        <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-card rounded-t-3xl p-6 shadow-elevated">
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-display font-700 text-foreground">Location Active</p>
              <p className="text-xs text-muted-foreground font-body">{locationName}</p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card"
          >
            Share Location
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LiveTrackingScreen;
