// client/src/App.tsx

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BannerCreator from "@/pages/BannerCreator";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Tuodaan editori suoraan ilman reititystä */}
        <BannerCreator />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
