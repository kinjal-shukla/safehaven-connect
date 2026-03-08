import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { motion } from "framer-motion";

const helplines = [
  { name: "Women Helpline", number: "1091", desc: "National Commission for Women" },
  { name: "Police", number: "100", desc: "Emergency Police Control" },
  { name: "Emergency", number: "112", desc: "Universal Emergency Number" },
  { name: "Domestic Abuse", number: "181", desc: "Women in Distress Helpline" },
  { name: "Child Helpline", number: "1098", desc: "Child Protection Services" },
  { name: "Ambulance", number: "102", desc: "Medical Emergency" },
];

const HelplineScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 pt-6 pb-8 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Helpline Numbers</h1>
      </div>

      <div className="space-y-3">
        {helplines.map((h, i) => (
          <motion.a
            key={i}
            href={`tel:${h.number}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-display font-700 text-foreground">{h.name}</p>
              <p className="text-xs text-muted-foreground font-body">{h.desc}</p>
            </div>
            <span className="text-lg font-display font-800 text-primary">{h.number}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default HelplineScreen;
