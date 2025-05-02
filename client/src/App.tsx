import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import BannerCreator from "@/pages/BannerCreator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={BannerCreator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      {/* debug-laatikon saa poistaa kun haluat */}


      {/* <<< Renderöidään BannerCreator suoraan >>> */}
      <BannerCreator />
    </>
  );
}



export default App;
