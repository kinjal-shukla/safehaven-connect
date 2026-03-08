import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const OTPScreen = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <div className="min-h-screen bg-background flex flex-col px-8 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-800 text-foreground mb-2">Verify OTP</h1>
        <p className="text-muted-foreground text-sm mb-8">
          We've sent a 6-digit code to your phone
        </p>

        <div className="flex gap-3 justify-center mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-display font-700 rounded-xl border-2 border-border bg-muted text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          ))}
        </div>

        <Button
          onClick={() => navigate("/create-profile")}
          disabled={otp.some((d) => !d)}
          className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 text-base rounded-2xl shadow-card disabled:opacity-50"
        >
          Verify
        </Button>

        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-muted-foreground text-sm">
              Resend in <span className="text-primary font-600">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-primary text-sm font-600"
            >
              Resend OTP
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OTPScreen;
