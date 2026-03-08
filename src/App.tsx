import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import LoginScreen from "./pages/LoginScreen";
import OTPScreen from "./pages/OTPScreen";
import CreateProfileScreen from "./pages/CreateProfileScreen";
import HomeScreen from "./pages/HomeScreen";
import SOSScreen from "./pages/SOSScreen";
import LiveTrackingScreen from "./pages/LiveTrackingScreen";
import ContactsScreen from "./pages/ContactsScreen";
import AddContactScreen from "./pages/AddContactScreen";
import AlertsScreen from "./pages/AlertsScreen";
import AlertDetailsScreen from "./pages/AlertDetailsScreen";
import FakeCallScreen from "./pages/FakeCallScreen";
import ShakeSOSScreen from "./pages/ShakeSOSScreen";
import SafetyTipsScreen from "./pages/SafetyTipsScreen";
import SupportScreen from "./pages/SupportScreen";
import MotivationalScreen from "./pages/MotivationalScreen";
import HelplineScreen from "./pages/HelplineScreen";
import ProfileScreen from "./pages/ProfileScreen";
import EditProfileScreen from "./pages/EditProfileScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotificationSettingsScreen from "./pages/NotificationSettingsScreen";
import PrivacySettingsScreen from "./pages/PrivacySettingsScreen";
import NotificationsScreen from "./pages/NotificationsScreen";
import AISupportChatScreen from "./pages/AISupportChatScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/otp" element={<OTPScreen />} />
          <Route path="/create-profile" element={<CreateProfileScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/sos" element={<SOSScreen />} />
          <Route path="/live-tracking" element={<LiveTrackingScreen />} />
          <Route path="/contacts" element={<ContactsScreen />} />
          <Route path="/add-contact" element={<AddContactScreen />} />
          <Route path="/alerts" element={<AlertsScreen />} />
          <Route path="/alert-details" element={<AlertDetailsScreen />} />
          <Route path="/fake-call" element={<FakeCallScreen />} />
          <Route path="/shake-sos" element={<ShakeSOSScreen />} />
          <Route path="/safety-tips" element={<SafetyTipsScreen />} />
          <Route path="/support" element={<SupportScreen />} />
          <Route path="/motivational" element={<MotivationalScreen />} />
          <Route path="/helpline" element={<HelplineScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/edit-profile" element={<EditProfileScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/notification-settings" element={<NotificationSettingsScreen />} />
          <Route path="/privacy-settings" element={<PrivacySettingsScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
