import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const quotes = [
  "You are strong and capable.",
  "Your courage inspires others.",
  "You deserve to feel safe and loved.",
  "Every step you take is a step toward strength.",
  "You are braver than you believe.",
  "Your voice matters. Speak up.",
];

const colors = [
  "gradient-primary",
  "bg-secondary",
  "gradient-primary",
  "bg-accent",
  "gradient-primary",
  "bg-secondary",
];

const MotivationalScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 pt-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Motivational Messages</h1>
      </div>

      <div className="space-y-4">
        {quotes.map((quote, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-2xl shadow-card relative ${colors[i]}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className={`font-display font-700 text-base leading-relaxed ${colors[i].includes("gradient") ? "text-primary-foreground" : "text-foreground"}`}>
              "{quote}"
            </p>
            <button className="absolute top-4 right-4">
              <Share2 className={`w-4 h-4 ${colors[i].includes("gradient") ? "text-primary-foreground/60" : "text-muted-foreground"}`} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MotivationalScreen;
