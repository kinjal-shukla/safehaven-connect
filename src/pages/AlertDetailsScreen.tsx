import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AlertDetailsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 pt-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Alert Details</h1>
      </div>

      {/* Map */}
      <div className="h-48 rounded-2xl bg-accent flex items-center justify-center mb-6 shadow-card">
        <MapPin className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-4">
        {[
          { icon: Clock, label: "Alert Time", value: "10 Feb 2026, 8:30 PM" },
          { icon: MapPin, label: "Location", value: "MG Road, Bangalore" },
          { icon: Users, label: "Contacts Notified", value: "Mom, Dad, Sister" },
          { icon: CheckCircle, label: "Status", value: "Resolved" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">{item.label}</p>
              <p className="text-sm font-display font-600 text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => navigate("/home")}
        className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card mt-8"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default AlertDetailsScreen;
