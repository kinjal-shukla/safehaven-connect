import { AlertTriangle, Users, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const stats = [
  { title: "Active SOS Alerts", value: "3", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  { title: "Total Users", value: "1,284", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { title: "Total Volunteers", value: "56", icon: Shield, color: "text-accent-foreground", bg: "bg-accent" },
  { title: "Alerts Today", value: "8", icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
];

const alertsPerDay = [
  { day: "Mon", alerts: 5 },
  { day: "Tue", alerts: 8 },
  { day: "Wed", alerts: 3 },
  { day: "Thu", alerts: 12 },
  { day: "Fri", alerts: 7 },
  { day: "Sat", alerts: 4 },
  { day: "Sun", alerts: 6 },
];

const alertsByLocation = [
  { name: "Ahmedabad", value: 35 },
  { name: "Mumbai", value: 25 },
  { name: "Delhi", value: 20 },
  { name: "Bangalore", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["hsl(340, 82%, 55%)", "hsl(320, 70%, 60%)", "hsl(0, 85%, 55%)", "hsl(340, 40%, 70%)", "hsl(340, 20%, 80%)"];

const recentAlerts = [
  { user: "Kinjal Patel", location: "Ahmedabad", time: "2 min ago", status: "ACTIVE" },
  { user: "Priya Sharma", location: "Mumbai", time: "15 min ago", status: "ACTIVE" },
  { user: "Neha Gupta", location: "Delhi", time: "1 hour ago", status: "Resolved" },
  { user: "Anita Roy", location: "Bangalore", time: "3 hours ago", status: "Resolved" },
];

const DashboardOverview = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-body text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-display font-800 text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border shadow-card">
            <CardHeader>
              <CardTitle className="font-display font-700 text-lg">Alerts Per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={alertsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(340, 20%, 90%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="alerts" fill="hsl(340, 82%, 55%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border shadow-card">
            <CardHeader>
              <CardTitle className="font-display font-700 text-lg">Alerts by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={alertsByLocation} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {alertsByLocation.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-display font-700 text-lg">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Location</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Time</th>
                    <th className="text-left py-3 px-4 font-body font-600 text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAlerts.map((alert, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 font-body font-600 text-foreground">{alert.user}</td>
                      <td className="py-3 px-4 font-body text-muted-foreground">{alert.location}</td>
                      <td className="py-3 px-4 font-body text-muted-foreground">{alert.time}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-600 ${alert.status === "ACTIVE" ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"}`}>
                          {alert.status}
                        </span>
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

export default DashboardOverview;
