import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col px-8 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
        <h1 className="text-2xl font-display font-800 text-foreground mb-2">Create Profile</h1>
        <p className="text-muted-foreground text-sm mb-8">Tell us about yourself</p>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
              <User className="w-10 h-10 text-accent-foreground" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-card">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 pl-10 rounded-xl border-border bg-muted font-body"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10 rounded-xl border-border bg-muted font-body"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Emergency Contact"
              className="h-12 pl-10 rounded-xl border-border bg-muted font-body"
            />
          </div>
        </div>

        <Button
          onClick={() => navigate("/home")}
          disabled={!name}
          className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 text-base rounded-2xl shadow-card mt-8 disabled:opacity-50"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateProfileScreen;
