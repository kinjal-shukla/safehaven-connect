import { useNavigate } from "react-router-dom";
import { Bell, Lock, Vibrate, ChevronRight, LogOut } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";

const settingsItems = [
  { icon: Bell, label: "Notification Settings", path: "/notification-settings" },
  { icon: Lock, label: "Privacy Settings", path: "/privacy-settings" },
  { icon: Vibrate, label: "Shake SOS", path: "/shake-sos" },
];

const SettingsScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        <h1 className="text-lg font-display font-800 text-foreground mb-6">Settings</h1>

        <div className="space-y-2">
          {settingsItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 text-sm font-display font-600 text-foreground">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-4 p-4 rounded-2xl border border-destructive/20 mt-8 text-left"
        >
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="text-sm font-display font-600 text-destructive">Logout</span>
        </button>
      </div>
    </MobileLayout>
  );
};

export default SettingsScreen;
