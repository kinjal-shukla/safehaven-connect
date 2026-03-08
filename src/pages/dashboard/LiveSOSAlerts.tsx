import { Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const alerts = [
  { id: 1, user: "Kinjal Patel", phone: "+91 98765 43210", location: "Satellite, Ahmedabad", time: "2 min ago", status: "ACTIVE" },
  { id: 2, user: "Priya Sharma", phone: "+91 91234 56789", location: "Andheri, Mumbai", time: "15 min ago", status: "ACTIVE" },
  { id: 3, user: "Neha Gupta", phone: "+91 87654 32109", location: "Connaught Place, Delhi", time: "1 hour ago", status: "ACTIVE" },
  { id: 4, user: "Anita Roy", phone: "+91 76543 21098", location: "Koramangala, Bangalore", time: "3 hours ago", status: "Resolved" },
  { id: 5, user: "Meera Singh", phone: "+91 65432 10987", location: "Salt Lake, Kolkata", time: "5 hours ago", status: "Resolved" },
  { id: 6, user: "Riya Desai", phone: "+91 54321 09876", location: "Baner, Pune", time: "Yesterday", status: "Cancelled" },
];

const LiveSOSAlerts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <span className="font-body font-600 text-destructive text-sm">Live Monitoring Active</span>
        </div>

        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-display font-700 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              SOS Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Phone</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Location</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Time</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-body font-600 text-foreground">{alert.user}</td>
                      <td className="py-3 px-4 font-body text-muted-foreground">{alert.phone}</td>
                      <td className="py-3 px-4 font-body text-muted-foreground">{alert.location}</td>
                      <td className="py-3 px-4 font-body text-muted-foreground">{alert.time}</td>
                      <td className="py-3 px-4">
                        <Badge variant={alert.status === "ACTIVE" ? "destructive" : alert.status === "Resolved" ? "default" : "secondary"}>
                          {alert.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline" className="rounded-xl text-xs">
                          <Eye className="w-3 h-3 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LiveSOSAlerts;
