//src/pages/OrderConfirmation.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle2, Home, Printer, Package } from 'lucide-react';

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  orderDate: string;
}

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderNumber] = useState(() => {
  const timestamp = Date.now().toString();
  // Get the last four digits of the timestamp (representing seconds/milliseconds)
  const timeSegment = timestamp.slice(-4); 
  
  // Get the first three characters of the random string
  const randomSegment = Math.random().toString(36).substr(2, 3).toUpperCase();
  
  return `KK-${timeSegment}-${randomSegment}`;
});

  // 1. EFFECT FOR DATA LOADING AND REDIRECTING (Runs on mount)
  useEffect(() => {
    const data = sessionStorage.getItem('lastOrder');
    
    if (!data) {
      // If no order data is found, redirect to home page
      navigate('/');
      return;
    }

    const parsedData = JSON.parse(data);
    // Successfully load data into state
    setOrderData(parsedData);
    
    // IMPORTANT: Cleanup logic removed from here
  }, [navigate]);

  // 2. EFFECT FOR CLEANUP (Runs only AFTER orderData state is set)
  useEffect(() => {
    if (orderData) {
      // Clear cart and remove data from storage ONLY after
      // orderData has been successfully loaded and confirmed.
      clearCart();
      sessionStorage.removeItem('lastOrder');
    }
  }, [orderData, clearCart]); // Dependency array includes orderData

  if (!orderData) return null;

  const orderDate = new Date(orderData.orderDate);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle2 className="mx-auto h-20 w-20 text-green-600 mb-4" />
            <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order, {orderData.name}. We'll send you a confirmation shortly.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Order Number</div>
                  <div className="font-semibold">{orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Order Date</div>
                  <div className="font-semibold">
                    {orderDate.toLocaleDateString('en-ZA', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-muted-foreground mb-2">Delivery Address</div>
                <div className="font-medium">{orderData.name}</div>
                <div className="text-muted-foreground">{orderData.address}</div>
                <div className="text-muted-foreground">
                  {orderData.city}, {orderData.postalCode}
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-muted-foreground mb-2">Contact Information</div>
                <div className="text-muted-foreground">{orderData.email}</div>
                <div className="text-muted-foreground">{orderData.phone}</div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="font-medium mb-1">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} × R{item.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Package className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">What's Next?</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• We'll contact you at {orderData.phone} to confirm your order</li>
                    <li>• Our team will arrange delivery to your location</li>
                    <li>• Expected delivery: Within 1-2 hours during operating hours</li>
                    <li>• You can reach us at +27 (0)11 123 4567 or orders@kasikota.co.za</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
            <Button 
              onClick={() => window.print()} 
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Order
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 