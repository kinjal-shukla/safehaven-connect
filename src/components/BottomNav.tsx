import { Home, Bell, Heart, User, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Bell, label: "Alerts", path: "/notifications" },
  { icon: Heart, label: "Support", path: "/support" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around py-1.5 px-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -top-1.5 w-5 h-[3px] rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <item.icon
                className={`w-[20px] h-[20px] transition-colors duration-150 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-body transition-colors duration-150 ${
                  isActive ? "text-primary font-700" : "text-muted-foreground font-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
