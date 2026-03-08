import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const NotificationSettingsScreen = () => {
  const navigate = useNavigate();
  const [sos, setSos] = useState(true);
  const [sms, setSms] = useState(true);
  const [push, setPush] = useState(false);

  const items = [
    { label: "SOS Notifications", desc: "Get notified when SOS is triggered", value: sos, onChange: setSos },
    { label: "SMS Alerts", desc: "Send SMS to emergency contacts", value: sms, onChange: setSms },
    { label: "Push Notifications", desc: "Receive push notifications", value: push, onChange: setPush },
  ];

  return (
    <div className="min-h-screen bg-background px-6 pt-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-display font-800 text-foreground">Notifications</h1>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border">
            <div>
              <p className="text-sm font-display font-700 text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground font-body">{item.desc}</p>
            </div>
            <Switch checked={item.value} onCheckedChange={item.onChange} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettingsScreen;
