import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Eye, Phone, Moon, Shield } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";

const tips = [
  { icon: MapPin, title: "Share Location", desc: "Always share your live location with trusted contacts when traveling." },
  { icon: Users, title: "Stay in Groups", desc: "Avoid isolated areas and try to walk in groups, especially at night." },
  { icon: Eye, title: "Stay Alert", desc: "Be aware of your surroundings and trust your instincts." },
  { icon: Phone, title: "Keep Phone Charged", desc: "Always keep your phone charged and emergency numbers saved." },
  { icon: Moon, title: "Plan Night Travel", desc: "Plan your route in advance and inform someone about your whereabouts." },
  { icon: Shield, title: "Use SafeShe", desc: "Keep SafeShe active with shake SOS enabled for instant help." },
];

const SafetyTipsScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-display font-800 text-foreground">Safety Tips</h1>
        </div>

        <div className="space-y-3">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 p-4 rounded-2xl gradient-card border border-border shadow-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <tip.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-display font-700 text-foreground mb-1">{tip.title}</p>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default SafetyTipsScreen;
