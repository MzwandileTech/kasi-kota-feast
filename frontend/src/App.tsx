import { useEffect } from 'react';
// Corrected imports to use relative paths (assuming all components are in the same relative structure)
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Corrected path for CartContext
import { CartProvider } from "./contexts/CartContext"; 
// Corrected paths for pages
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

// Component to handle dynamic page titles and scroll to top on route change
const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change (Good practice for new pages)
    window.scrollTo(0, 0); 
    
    // Map the current pathname to a title prefix
    const path = location.pathname;
    let titlePrefix = "Home";

    if (path === '/checkout') titlePrefix = "Checkout";
    else if (path === '/order-confirmation') titlePrefix = "Order Confirmation";
    else if (path.startsWith('/products/')) titlePrefix = "Product Details";
    else if (path !== '/') titlePrefix = "Page Not Found";
    
    document.title = `Kasi Kota | ${titlePrefix}`;
  }, [location.pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Include the title updater inside BrowserRouter */}
          <PageTitleUpdater /> 
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
