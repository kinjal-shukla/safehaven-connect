import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ChevronDown, ArrowLeft, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/safeshe-logo.png";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode] = useState("+91");
  const [focused, setFocused] = useState(false);

  const handleSendOTP = () => {
    if (phone.length >= 10) navigate("/otp");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[280px] h-[280px] rounded-full bg-primary/8 blur-[100px]" />
      <div className="absolute bottom-32 -left-20 w-[220px] h-[220px] rounded-full bg-accent/30 blur-[80px]" />

      <div className="flex-1 flex flex-col px-6 pt-5 relative z-10">
        {/* Back button */}
        <motion.button
          onClick={() => navigate("/welcome")}
          className="w-10 h-10 rounded-2xl glass border border-border/40 flex items-center justify-center shadow-soft mb-8"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowLeft className="w-[18px] h-[18px] text-foreground" />
        </motion.button>

        {/* Logo + header section */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative mb-5">
            <div className="absolute inset-[-16px] rounded-full bg-primary/10 blur-2xl animate-glow-pulse" />
            <div className="w-20 h-20 rounded-[24px] gradient-primary flex items-center justify-center shadow-glow border border-primary-foreground/10">
              <img src={logo} alt="SafeShe" className="w-14 h-14 relative z-10" />
            </div>
          </div>
          <h1 className="text-[28px] font-display font-900 text-foreground tracking-tight text-center">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-[14px] mt-1.5 font-body font-500 text-center">
            Sign in to keep yourself safe
          </p>
        </motion.div>

        {/* Phone input card */}
        <motion.div
          className="rounded-[22px] bg-card border border-border/50 p-5 shadow-elevated mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-[12px] font-display font-700 text-foreground uppercase tracking-wider">Phone Number</span>
          </div>
          
          <div
            className={`flex items-center rounded-2xl border-2 transition-all duration-200 bg-background overflow-hidden ${
              focused ? "border-primary shadow-glow/20" : "border-border"
            }`}
          >
            <button className="flex items-center gap-1.5 px-4 h-[54px] text-foreground font-body font-600 text-[14px] border-r border-border bg-muted/30 flex-shrink-0 hover:bg-muted/50 transition-colors">
              🇮🇳 {countryCode}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <Input
              type="tel"
              placeholder="Enter your number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="h-[54px] border-0 bg-transparent text-foreground font-body font-600 text-[16px] placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
              maxLength={10}
            />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleSendOTP}
            disabled={phone.length < 10}
            className="w-full gradient-primary text-primary-foreground font-display font-700 text-[15px] rounded-2xl shadow-glow disabled:opacity-35 disabled:shadow-none transition-all duration-300 active:scale-[0.98]"
            style={{ height: 54 }}
          >
            <Lock className="w-4 h-4 mr-2" />
            Send OTP
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3 my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] font-body font-500 text-muted-foreground">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Social login */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <button className="flex-1 h-[50px] rounded-2xl glass border border-border/50 flex items-center justify-center gap-2 shadow-soft hover:shadow-elevated transition-all active:scale-[0.97]">
            <span className="text-[18px]">🔵</span>
            <span className="text-[13px] font-display font-700 text-foreground">Google</span>
          </button>
          <button className="flex-1 h-[50px] rounded-2xl glass border border-border/50 flex items-center justify-center gap-2 shadow-soft hover:shadow-elevated transition-all active:scale-[0.97]">
            <span className="text-[18px]">🍎</span>
            <span className="text-[13px] font-display font-700 text-foreground">Apple</span>
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary/60" />
            <span className="text-[10px] font-body font-500 text-muted-foreground">End-to-end encrypted</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary/60" />
            <span className="text-[10px] font-body font-500 text-muted-foreground">100% Private</span>
          </div>
        </motion.div>

        {/* Terms */}
        <motion.p
          className="text-center text-[11px] text-muted-foreground/60 mt-auto pb-8 leading-relaxed font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
