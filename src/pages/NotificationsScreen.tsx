import { Bell, ShieldAlert, MessageCircle, Info, Trash2 } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";

const notifications = [
  {
    id: 1,
    icon: ShieldAlert,
    title: "SOS Alert Sent",
    message: "Your emergency alert was sent to 3 contacts successfully.",
    time: "2 min ago",
    type: "alert" as const,
    read: false,
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "AI Support Available",
    message: "Need someone to talk to? Our AI companion is here 24/7.",
    time: "1 hour ago",
    type: "support" as const,
    read: false,
  },
  {
    id: 3,
    icon: Bell,
    title: "Shake SOS Enabled",
    message: "Shake your phone 3 times to trigger an emergency alert.",
    time: "3 hours ago",
    type: "info" as const,
    read: true,
  },
  {
    id: 4,
    icon: Info,
    title: "Safety Tip of the Day",
    message: "Always share your live location when traveling alone at night.",
    time: "5 hours ago",
    type: "tip" as const,
    read: true,
  },
  {
    id: 5,
    icon: ShieldAlert,
    title: "Contact Added",
    message: "Mom has been added to your emergency contacts.",
    time: "1 day ago",
    type: "info" as const,
    read: true,
  },
];

const typeColors = {
  alert: "bg-destructive/10 text-destructive",
  support: "bg-accent text-primary",
  info: "bg-secondary text-secondary-foreground",
  tip: "bg-accent text-accent-foreground",
};

const NotificationsScreen = () => {
  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-display font-800 text-foreground">Notifications</h1>
          <button className="text-xs text-primary font-body font-600">Mark all read</button>
        </div>

        <div className="space-y-3">
          {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              className={`flex items-start gap-3 p-4 rounded-2xl border shadow-card transition-colors ${
                notif.read
                  ? "bg-card border-border opacity-70"
                  : "bg-card border-primary/20"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeColors[notif.type]}`}>
                <notif.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-display font-700 text-foreground truncate">{notif.title}</p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-2">{notif.message}</p>
                <p className="text-[10px] text-muted-foreground/60 font-body mt-1">{notif.time}</p>
              </div>
              <button className="shrink-0 p-1 text-muted-foreground/40 hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground font-body">No notifications yet</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default NotificationsScreen;
