import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const OTPScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[180px] rounded-full bg-primary/5 blur-[80px]" />

      <div className="flex-1 flex flex-col px-6 pt-6 relative z-10">
        {/* Back */}
        <motion.button
          onClick={() => navigate("/login")}
          className="w-10 h-10 rounded-xl bg-card shadow-card border border-border/50 flex items-center justify-center mb-10"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-[18px] h-[18px] text-foreground" />
        </motion.button>

        {/* Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
            <ShieldCheck className="w-7 h-7 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h1 className="text-[24px] font-display font-900 text-foreground tracking-tight">Verify your number</h1>
          <p className="text-muted-foreground text-[13px] mt-1.5 font-body font-500">
            Enter the 6-digit code sent to your phone
          </p>
        </motion.div>

        {/* OTP inputs */}
        <motion.div
          className="flex gap-2.5 justify-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-14 text-center text-[20px] font-display font-800 rounded-xl border-2 transition-all duration-200 bg-card text-foreground outline-none ${
                digit ? "border-primary bg-primary/5" : "border-border"
              } focus:border-primary focus:shadow-glow/20`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.04 }}
            />
          ))}
        </motion.div>

        {/* Verify button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => navigate("/create-profile")}
            disabled={!isComplete}
            className="w-full gradient-primary text-primary-foreground font-display font-700 text-[15px] rounded-2xl shadow-glow disabled:opacity-40 disabled:shadow-none transition-all active:scale-[0.98]"
            style={{ height: 52 }}
          >
            Verify & Continue
          </Button>
        </motion.div>

        {/* Resend */}
        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-muted-foreground text-[13px] font-body font-500">
              Resend code in <span className="text-primary font-700">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-primary text-[13px] font-body font-700 active:opacity-70"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
