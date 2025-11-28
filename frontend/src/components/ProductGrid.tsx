import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';
import productsData from '@/data/products.json';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
}

// --- Data Initialization & Constants (moved outside the component) ---
const PRODUCTS: ReadonlyArray<Product> = productsData as ReadonlyArray<Product>;
const MAX_PRICE: number = Math.max(...PRODUCTS.map(p => p.price), 0); // Ensures min 0 if data is empty
const CATEGORIES: ReadonlyArray<string> = ['all', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

// Currency formatter for clean display (Adjust 'en-ZA'/'ZAR' if location changes)
const currencyFormatter = new Intl.NumberFormat('en-ZA', { 
  style: 'currency', 
  currency: 'ZAR', 
  maximumFractionDigits: 0 
});


export const ProductGrid = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Initialize price range to cover all products by default
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);

  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filtering
    let filtered = PRODUCTS.filter(product => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    // 2. Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [categoryFilter, sortBy, priceRange]); // 'PRODUCTS' is constant, so removed from dependencies

  return (
    <section id="products" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">Our Signature Kotas</h2>
          <p className="text-lg text-muted-foreground">
            Handcrafted with authentic township flavors
          </p>
        </div>

        {/* --- Filter Controls --- */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm font-medium mb-2 block">
              Price Range: {currencyFormatter.format(priceRange[0])} - {currencyFormatter.format(priceRange[1])}
            </label>
            <Slider
              min={0}
              max={MAX_PRICE}
              step={1} // Changed step to 1 for flexibility (was 5)
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2"
            />
          </div>
        </div>
        
        {/* --- Product Grid --- */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/20 cursor-pointer"
                // ADDED: Navigate to product detail when the card is clicked
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    loading="lazy" // UX Improvement
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                  <CardDescription className="text-base line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-3xl font-bold text-primary">
                    {currencyFormatter.format(product.price)} {/* Formatted Price */}
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button 
                    className="flex-1 font-semibold"
                    variant="outline"
                    size="lg"
                    // MODIFIED: Added e.stopPropagation() to prevent double navigation
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    View
                  </Button>
                  <Button 
                    className="flex-1 font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    size="lg"
                    // MODIFIED: Added e.stopPropagation() to prevent card navigation when adding to cart
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          /* --- Empty State Feedback --- */
          <div className="py-12 text-center col-span-full">
            <h3 className="text-2xl font-semibold text-muted-foreground">
              No Kotas found matching your filters.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your price range or category.</p>
          </div>
        )}
      </div>
    </section>
  );
};