import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
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
    <div className="min-h-screen bg-background flex flex-col px-8 py-12">
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center mb-10">
          <img src={logo} alt="SafeShe" className="w-16 h-16" />
        </div>

        <h1 className="text-2xl font-display font-800 text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-sm mb-8">Enter your phone number to continue</p>

        <div className="space-y-4">
          <div className="flex gap-3">
            <button className="flex items-center gap-1 px-4 h-12 rounded-xl border border-border bg-muted text-foreground font-body font-600 text-sm">
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
                className="h-12 pl-10 rounded-xl border-border bg-muted text-foreground font-body"
                maxLength={10}
              />
            </div>
          </div>

          <Button
            onClick={handleSendOTP}
            disabled={phone.length < 10}
            className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 text-base rounded-2xl shadow-card disabled:opacity-50"
          >
            Send OTP
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
