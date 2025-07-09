import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExploreProducts from "./pages/ExploreProducts";
import CustomizeMeal from "./pages/CustomizeMeal";
import SuccessStories from "./pages/SuccessStories";
import RequestCustom from "./pages/RequestCustom";
import FestiveBooking from "./pages/FestiveBooking";
import TopSellersPage from "./pages/TopSellersPage";
import Leaderboard from "./pages/Leaderboard";
import UploadItems from "./pages/UploadItems";
import VoiceSearch from "./pages/VoiceSearch";
import SellerDashboard from "./pages/SellerDashboard";
import IntroLoader from "./components/IntroLoader";
import HelpCenter from "./pages/HelpCenter";
import ShippingInfo from "./pages/ShippingInfo";
import ReturnPolicy from "./pages/ReturnPolicy";
import ContactUs from "./pages/ContactUs";
import SellerSupport from "./pages/SellerSupport";
import SellerProfile from "./pages/SellerProfile";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroLoader onComplete={handleIntroComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<ExploreProducts />} />
            <Route path="/customize-meal" element={<CustomizeMeal />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/request-custom" element={<RequestCustom />} />
            <Route path="/festive-booking" element={<FestiveBooking />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/upload-items" element={<UploadItems />} />
            <Route path="/voice-search" element={<VoiceSearch />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/returns" element={<ReturnPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/seller-support" element={<SellerSupport />} />
            <Route path="/seller/:sellerId" element={<SellerProfile />} />
            <Route path="/top-sellers" element={<TopSellersPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;