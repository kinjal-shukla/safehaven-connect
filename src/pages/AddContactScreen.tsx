import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddContactScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  return (
    <div className="min-h-screen bg-background px-6 pt-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Add Contact</h1>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 pl-10 rounded-xl bg-muted font-body" />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 pl-10 rounded-xl bg-muted font-body" />
        </div>
        <div className="relative">
          <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Relationship" value={relation} onChange={(e) => setRelation(e.target.value)} className="h-12 pl-10 rounded-xl bg-muted font-body" />
        </div>
      </div>

      <Button
        onClick={() => navigate("/contacts")}
        disabled={!name || !phone}
        className="w-full h-12 gradient-primary text-primary-foreground font-display font-700 rounded-2xl shadow-card mt-8 disabled:opacity-50"
      >
        Save Contact
      </Button>
    </div>
  );
};

export default AddContactScreen;
