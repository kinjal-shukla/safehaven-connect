import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const PrivacySettingsScreen = () => {
  const navigate = useNavigate();
  const [locationSharing, setLocationSharing] = useState(true);
  const [dataPermissions, setDataPermissions] = useState(true);

  return (
    <div className="min-h-screen bg-background px-6 pt-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Privacy</h1>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border">
          <div>
            <p className="text-sm font-display font-700 text-foreground">Location Sharing</p>
            <p className="text-xs text-muted-foreground font-body">Share location with contacts</p>
          </div>
          <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
        </div>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border">
          <div>
            <p className="text-sm font-display font-700 text-foreground">Data Permissions</p>
            <p className="text-xs text-muted-foreground font-body">Allow data collection for safety</p>
          </div>
          <Switch checked={dataPermissions} onCheckedChange={setDataPermissions} />
        </div>
      </div>

      <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-destructive/20 mt-8 text-left">
        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
          <Trash2 className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <p className="text-sm font-display font-600 text-destructive">Delete Account</p>
          <p className="text-xs text-muted-foreground font-body">Permanently delete your account</p>
        </div>
      </button>
    </div>
  );
};

export default PrivacySettingsScreen;
