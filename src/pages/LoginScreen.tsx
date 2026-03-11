import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/safeshe-logo.png";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      navigate("/otp");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute top-1/2 -left-24 w-48 h-48 rounded-full bg-accent/30 blur-3xl" />

      <div className="flex-1 flex flex-col px-8 py-10 relative z-10">
        {/* Back button */}
        <motion.button
          onClick={() => navigate("/welcome")}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center shadow-card mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>

        {/* Logo */}
        <motion.div
          className="flex items-center justify-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl scale-150" />
            <img src={logo} alt="SafeShe" className="w-16 h-16 relative z-10 drop-shadow-lg" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-display font-900 text-foreground mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mb-8 font-body">Enter your phone number to continue</p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-3">
            <button className="flex items-center gap-1 px-4 h-12 rounded-xl glass shadow-card text-foreground font-body font-600 text-sm">
              {countryCode}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex-1 relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 pl-10 rounded-xl border-border/50 bg-muted/50 text-foreground font-body focus:bg-background transition-colors"
                maxLength={10}
              />
            </div>
          </div>

          <Button
            onClick={handleSendOTP}
            disabled={phone.length < 10}
            className="w-full gradient-primary text-primary-foreground font-display font-700 text-base rounded-2xl shadow-glow disabled:opacity-50 disabled:shadow-none transition-shadow"
            style={{ height: 52 }}
          >
            Send OTP
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
