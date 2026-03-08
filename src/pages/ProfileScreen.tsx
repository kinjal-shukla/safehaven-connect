import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Edit, Shield } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";

const ProfileScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        <h1 className="text-lg font-display font-800 text-foreground mb-6">My Profile</h1>

        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="text-xl font-display font-800 text-foreground">Aisha Sharma</h2>
          <p className="text-sm text-muted-foreground font-body">+91 98765 43210</p>
        </motion.div>

        <div className="space-y-3">
          {[
            { icon: User, label: "Name", value: "Aisha Sharma" },
            { icon: Mail, label: "Email", value: "aisha@email.com" },
            { icon: Phone, label: "Phone", value: "+91 98765 43210" },
            { icon: Shield, label: "Emergency Contacts", value: "3 contacts" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-body">{item.label}</p>
                <p className="text-sm font-display font-600 text-foreground">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card mt-6 flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>
    </MobileLayout>
  );
};

export default ProfileScreen;
