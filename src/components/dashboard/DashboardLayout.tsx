import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  Map,
  MapPin,
  History,
  Users,
  MapPinned,
  BarChart3,
  LogOut,
  Shield,
} from "lucide-react";
import logo from "@/assets/safeshe-logo.png";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Live Alerts", icon: AlertTriangle, path: "/dashboard/live-alerts" },
  { title: "Map Monitoring", icon: Map, path: "/dashboard/map" },
  { title: "User Tracking", icon: MapPin, path: "/dashboard/user-tracking" },
  { title: "Alert History", icon: History, path: "/dashboard/alert-history" },
  { title: "Volunteers", icon: Users, path: "/dashboard/volunteers" },
  { title: "Volunteer Map", icon: MapPinned, path: "/dashboard/volunteer-map" },
  { title: "Reports", icon: BarChart3, path: "/dashboard/reports" },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shadow-sm">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <img src={logo} alt="SafeShe" className="w-10 h-10" />
          <div>
            <h1 className="font-display font-800 text-foreground text-lg leading-tight">SafeShe</h1>
            <p className="text-[11px] text-muted-foreground font-body">Monitoring Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body font-600 transition-all",
                  isActive
                    ? "gradient-primary text-primary-foreground shadow-card"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={() => navigate("/dashboard/login")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body font-600 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display font-700 text-foreground">
              {navItems.find((n) => n.path === location.pathname)?.title || "Dashboard"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-700">
              V
            </div>
          </div>
        </header>
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
