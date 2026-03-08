import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Vibrate, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ShakeSOSScreen = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-background px-6 pt-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Shake SOS</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4">
          <Vibrate className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-foreground font-display font-700 mb-1">Shake to Send SOS</h2>
        <p className="text-muted-foreground text-sm text-center font-body">
          Shake your phone 3 times quickly to automatically send an SOS alert
        </p>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border shadow-card mb-6">
        <div>
          <p className="text-sm font-display font-700 text-foreground">Enable Shake SOS</p>
          <p className="text-xs text-muted-foreground font-body">Activate emergency shake detection</p>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <div className="p-4 rounded-2xl bg-secondary">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-display font-600 text-foreground mb-1">How it works</p>
            <ol className="text-xs text-muted-foreground font-body space-y-1 list-decimal list-inside">
              <li>Enable shake detection above</li>
              <li>Shake your phone 3 times rapidly</li>
              <li>SOS alert will be sent automatically</li>
              <li>Your contacts will be notified</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShakeSOSScreen;
