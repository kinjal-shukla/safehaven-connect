import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const alerts = [
  { user: "Kinjal Patel", location: "Satellite, Ahmedabad", status: "ACTIVE", time: "2 min ago" },
  { user: "Priya Sharma", location: "Andheri, Mumbai", status: "ACTIVE", time: "15 min ago" },
];

const MapMonitoring = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 h-[calc(100vh-10rem)]">
        <div className="flex gap-4 h-full">
          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-border shadow-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.70717962953!2d72.43965645!3d23.020150600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map Monitoring"
            />
          </div>

          {/* Side Panel */}
          <div className="w-80 space-y-3">
            <h3 className="font-display font-700 text-sm text-foreground">Active SOS Alerts</h3>
            {alerts.map((alert, i) => (
              <Card key={i} className="border-destructive/30 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-700 text-foreground text-sm">{alert.user}</p>
                      <p className="font-body text-muted-foreground text-xs">{alert.location}</p>
                      <p className="font-body text-muted-foreground text-xs mt-1">{alert.time}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-600 bg-destructive/10 text-destructive">
                      {alert.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="pt-4 space-y-2">
              <h3 className="font-display font-700 text-sm text-foreground">Legend</h3>
              <div className="flex items-center gap-2 text-xs font-body">
                <div className="w-3 h-3 rounded-full bg-destructive" /> SOS Alert
              </div>
              <div className="flex items-center gap-2 text-xs font-body">
                <div className="w-3 h-3 rounded-full bg-primary" /> Volunteer
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapMonitoring;
