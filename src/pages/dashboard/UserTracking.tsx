import { MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const locationHistory = [
  { time: "10:00 AM", location: "Home - Satellite, Ahmedabad", type: "start" },
  { time: "10:30 AM", location: "SG Highway", type: "waypoint" },
  { time: "11:00 AM", location: "Office - Prahlad Nagar", type: "waypoint" },
  { time: "2:00 PM", location: "Lunch - Drive In Road", type: "waypoint" },
  { time: "3:30 PM", location: "Current - CG Road", type: "current" },
];

const UserTracking = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-4 h-[calc(100vh-10rem)]">
        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-border shadow-card">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58761.11498755675!2d72.54607755!3d23.030150600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="User Tracking"
          />
        </div>

        {/* Side Panel */}
        <div className="w-80 space-y-4">
          <Card className="border-border shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display font-700 text-base">Kinjal Patel</CardTitle>
              <p className="text-xs font-body text-muted-foreground">+91 98765 43210</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs font-body">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Online • Last seen 1 min ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display font-700 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Location History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationHistory.map((loc, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${loc.type === "current" ? "bg-primary animate-pulse" : loc.type === "start" ? "bg-accent-foreground" : "bg-muted-foreground/40"}`} />
                      {i < locationHistory.length - 1 && <div className="w-0.5 h-full bg-border mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-body font-600 text-foreground">{loc.location}</p>
                      <p className="text-[10px] font-body text-muted-foreground">{loc.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserTracking;
