import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/safeshe-logo.png";

const DashboardLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-primary p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-3xl shadow-elevated p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="SafeShe" className="w-20 h-20 mb-4" />
          <h1 className="text-2xl font-display font-800 text-foreground">SafeShe Dashboard</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">Monitoring & Volunteer Portal</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10 rounded-xl border-border bg-muted text-foreground font-body"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 pl-10 rounded-xl border-border bg-muted text-foreground font-body"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 text-base rounded-2xl shadow-card disabled:opacity-50"
          >
            Login
          </Button>

          <button className="w-full text-center text-sm text-primary font-body font-600 hover:underline">
            Forgot password?
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardLogin;
