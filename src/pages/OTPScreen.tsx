import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Fingerprint } from "lucide-react";
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
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== "");
  const filledCount = otp.filter((d) => d !== "").length;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[320px] h-[220px] rounded-full bg-primary/6 blur-[100px]" />
      <div className="absolute bottom-40 -right-20 w-[180px] h-[180px] rounded-full bg-accent/25 blur-[70px]" />

      <div className="flex-1 flex flex-col px-6 pt-5 relative z-10">
        {/* Back */}
        <motion.button
          onClick={() => navigate("/login")}
          className="w-10 h-10 rounded-2xl glass border border-border/40 flex items-center justify-center shadow-soft mb-8"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowLeft className="w-[18px] h-[18px] text-foreground" />
        </motion.button>

        {/* Header */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative mb-4">
            <div className="absolute inset-[-12px] rounded-full bg-primary/10 blur-xl animate-glow-pulse" />
            <div className="w-16 h-16 rounded-[20px] gradient-primary flex items-center justify-center shadow-glow">
              <ShieldCheck className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-[26px] font-display font-900 text-foreground tracking-tight">Verify OTP</h1>
          <p className="text-muted-foreground text-[13px] mt-1.5 font-body font-500 text-center">
            We sent a 6-digit code to your phone
          </p>
          <p className="text-primary text-[13px] font-body font-700 mt-0.5">+91 ●●●●●●7890</p>
        </motion.div>

        {/* Progress dots */}
        <motion.div
          className="flex justify-center gap-1.5 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < filledCount ? "bg-primary scale-110" : "bg-border"
              }`}
            />
          ))}
        </motion.div>

        {/* OTP Card */}
        <motion.div
          className="rounded-[22px] bg-card border border-border/50 p-5 shadow-elevated mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Fingerprint className="w-4 h-4 text-primary" />
            <span className="text-[12px] font-display font-700 text-foreground uppercase tracking-wider">Enter Code</span>
          </div>

          <div className="flex gap-2.5 justify-center">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-[46px] h-[56px] text-center text-[22px] font-display font-800 rounded-xl border-2 transition-all duration-200 bg-background text-foreground outline-none ${
                  digit
                    ? "border-primary bg-primary/5 shadow-glow/10"
                    : "border-border hover:border-muted-foreground/30"
                } focus:border-primary focus:shadow-glow/20 focus:bg-primary/5`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Verify */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Button
            onClick={() => navigate("/create-profile")}
            disabled={!isComplete}
            className="w-full gradient-primary text-primary-foreground font-display font-700 text-[15px] rounded-2xl shadow-glow disabled:opacity-35 disabled:shadow-none transition-all active:scale-[0.98]"
            style={{ height: 54 }}
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Verify & Continue
          </Button>
        </motion.div>

        {/* Resend */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          {timer > 0 ? (
            <div>
              <p className="text-muted-foreground text-[13px] font-body font-500">
                Didn't receive the code?
              </p>
              <p className="text-foreground text-[14px] font-display font-800 mt-1">
                Resend in <span className="text-primary">{timer}s</span>
              </p>
            </div>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-primary text-[14px] font-display font-700 px-5 py-2 rounded-xl bg-primary/5 border border-primary/20 active:bg-primary/10 transition-colors"
            >
              Resend Code
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OTPScreen;
