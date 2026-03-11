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
  const [countryCode] = useState("+91");
  const [focused, setFocused] = useState(false);

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      navigate("/otp");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[200px] rounded-full bg-primary/6 blur-[80px]" />

      <div className="flex-1 flex flex-col px-6 pt-6 relative z-10">
        {/* Nav */}
        <motion.button
          onClick={() => navigate("/welcome")}
          className="w-10 h-10 rounded-xl bg-card shadow-card border border-border/50 flex items-center justify-center mb-10"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-[18px] h-[18px] text-foreground" />
        </motion.button>

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-[-12px] rounded-full bg-primary/10 blur-xl" />
            <img src={logo} alt="SafeShe" className="w-14 h-14 relative z-10" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <h1 className="text-[26px] font-display font-900 text-foreground tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-[14px] mt-1 font-body font-500">
            Enter your phone number to continue
          </p>
        </motion.div>

        {/* Phone input — Instagram-style clean field */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div
            className={`flex items-center gap-0 rounded-2xl border-2 transition-all duration-200 bg-card overflow-hidden ${
              focused ? "border-primary shadow-glow/20" : "border-border"
            }`}
          >
            <button className="flex items-center gap-1 px-4 h-[52px] text-foreground font-body font-600 text-[14px] border-r border-border bg-muted/30 flex-shrink-0">
              🇮🇳 {countryCode}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <div className="flex-1 relative">
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="h-[52px] border-0 bg-transparent text-foreground font-body font-600 text-[15px] placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                maxLength={10}
              />
            </div>
          </div>

          <Button
            onClick={handleSendOTP}
            disabled={phone.length < 10}
            className="w-full gradient-primary text-primary-foreground font-display font-700 text-[15px] rounded-2xl shadow-glow disabled:opacity-40 disabled:shadow-none transition-all duration-300 active:scale-[0.98]"
            style={{ height: 52 }}
          >
            Continue
          </Button>
        </motion.div>

        {/* Terms */}
        <motion.p
          className="text-center text-[11px] text-muted-foreground/70 mt-6 leading-relaxed font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          By continuing, you agree to our{" "}
          <span className="text-primary font-600">Terms of Service</span> and{" "}
          <span className="text-primary font-600">Privacy Policy</span>
        </motion.p>
      </div>
    </div>
  );
};

export default LoginScreen;
