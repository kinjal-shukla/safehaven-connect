import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Aisha Sharma");
  const [email, setEmail] = useState("aisha@email.com");

  return (
    <div className="min-h-screen bg-background px-6 pt-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Edit Profile</h1>
      </div>

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
          <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 pl-10 rounded-xl bg-muted font-body" />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 pl-10 rounded-xl bg-muted font-body" />
        </div>
      </div>

      <Button
        onClick={() => navigate("/profile")}
        className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card mt-8"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default EditProfileScreen;
