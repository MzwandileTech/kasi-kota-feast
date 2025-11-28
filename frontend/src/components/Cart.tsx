import { Button } from './ui/button'; // Corrected path
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'; // Corrected path
import { useCart } from '../contexts/CartContext'; // Corrected path
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge'; // Corrected path
import { toast } from '../hooks/use-toast'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 

export const Cart = () => {
  const { items, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false); 

  const handleCheckout = () => {
    setOpen(false); // Close the sheet before navigation
    // Use client-side routing to prevent full page reload, which fixes the empty cart issue
    navigate('/checkout'); 
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}> {/* Control the sheet state */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge 
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              variant="default"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl">Your Order</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <p className="text-xl font-semibold">Your cart is empty.</p>
              <p className="text-sm text-muted-foreground">
                Add some delicious Kotas to get started!
              </p>
              <Button onClick={() => setOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-primary font-bold">R{item.price.toFixed(2)}</div>
                    <div className="flex items-center mt-2 space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-8 w-8"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="mb-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-primary">R{cartTotal.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleCheckout} // Use the client-side navigation handler
            >
              Checkout Now
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};