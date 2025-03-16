import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ArticlePage from "@/pages/ArticlePage";
import CategoryPage from "@/pages/CategoryPage";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/article/:slug" component={ArticlePage} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
