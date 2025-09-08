import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LawnQuestionnaire from "./components/LawnQuestionnaire";

const queryClient = new QueryClient();

const App = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header onStartPlan={() => setShowQuestionnaire(true)} />
          {showQuestionnaire ? (
            <LawnQuestionnaire onBack={() => setShowQuestionnaire(false)} />
          ) : (
            <Routes>
              <Route path="/" element={<Index onStartPlan={() => setShowQuestionnaire(true)} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
