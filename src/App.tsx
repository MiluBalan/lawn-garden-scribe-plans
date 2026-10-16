import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LawnQuestionnaire, { clearSavedPlan } from "./components/LawnQuestionnaire";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const navigate = useNavigate();
  const startPlan = () => {
    clearSavedPlan();
    navigate("/plan");
    // force fresh state even if already on /plan
    window.dispatchEvent(new Event("biogrowth-reset"));
  };

  return (
    <>
      <Header onStartPlan={startPlan} />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Index onStartPlan={startPlan} />} />
          <Route path="/plan/*" element={<PlanRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

const PlanRoute = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  useEffect(() => {
    const onReset = () => setKey((k) => k + 1);
    window.addEventListener("biogrowth-reset", onReset);
    return () => window.removeEventListener("biogrowth-reset", onReset);
  }, []);
  return <LawnQuestionnaire key={key} onBack={() => navigate("/")} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
