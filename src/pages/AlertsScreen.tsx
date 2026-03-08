import { useNavigate } from "react-router-dom";
import { MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";

const alerts = [
  { id: 1, date: "10 Feb 2026", location: "MG Road, Bangalore", status: "Resolved", type: "resolved" as const },
  { id: 2, date: "05 Feb 2026", location: "Koramangala, Bangalore", status: "Resolved", type: "resolved" as const },
  { id: 3, date: "28 Jan 2026", location: "Indiranagar, Bangalore", status: "Pending", type: "pending" as const },
];

const AlertsScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        <h1 className="text-lg font-display font-800 text-foreground mb-6">Alert History</h1>

        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <motion.button
              key={alert.id}
              onClick={() => navigate("/alert-details")}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-card text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${alert.type === "resolved" ? "bg-secondary" : "bg-destructive/10"}`}>
                {alert.type === "resolved" ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-display font-700 text-foreground">SOS Alert</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-body">{alert.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-body">{alert.location}</span>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-body font-600 ${alert.type === "resolved" ? "bg-secondary text-primary" : "bg-destructive/10 text-destructive"}`}>
                {alert.status}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default AlertsScreen;
