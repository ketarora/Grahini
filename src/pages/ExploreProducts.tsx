import { useState, useMemo } from "react"; // Added useMemo
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Assuming mockSellers and getTopSellerIds can be imported or defined here for demo
// For a cleaner setup, mockSellers would be in a shared file.
// For this step, I will copy the relevant mockSellers and getTopSellers logic.
// In a real app, this would be fetched or come from a centralized store/context.

// COPIED MOCK DATA AND LOGIC (TEMPORARY for this step)
// Ideally, this comes from a shared util or context
const mockSellersForExplore = [ // Renamed to avoid conflict if this file is processed multiple times
  { id: 1, name: "Sunita Devi", ordersThisWeek: 120, rating: 4.9 },
  { id: 2, name: "Meera Didi", ordersThisWeek: 95, rating: 4.8 },
  { id: 3, name: "Radha Ma", ordersThisWeek: 150, rating: 4.7 },
  { id: 4, name: "Chef Priya", ordersThisWeek: 110, rating: 4.85 },
  { id: 5, name: "Artisan Crafts Co.", ordersThisWeek: 70, rating: 4.9 },
  // Add other sellers if product data refers to them by name
  { id: 'radha-kitchen', name: "Radha Kitchen", ordersThisWeek: 80, rating: 4.6 }, // Example, if product.seller is "Radha Kitchen"
  { id: 'meeras-beauty', name: "Meera's Beauty", ordersThisWeek: 60, rating: 4.9 },
  { id: 'artisan-crafts', name: "Artisan Crafts", ordersThisWeek: 50, rating: 4.7 },
  { id: 'ammas-kitchen', name: "Amma's Kitchen", ordersThisWeek: 130, rating: 4.8 },
  { id: 'farm-fresh', name: "Farm Fresh", ordersThisWeek: 90, rating: 4.5 },
  { id: 'mamtas-kitchen', name: "Mamta's Kitchen", ordersThisWeek: 75, rating: 4.7 },
  { id: 'natures-touch', name: "Nature's Touch", ordersThisWeek: 65, rating: 4.6 },
  { id: 'kiran-crafts', name: "Kiran Crafts", ordersThisWeek: 55, rating: 4.8 },
  { id: 'fresh-farm', name: "Fresh Farm", ordersThisWeek: 85, rating: 4.4 },
  { id: 'hill-station-fruits', name: "Hill Station Fruits", ordersThisWeek: 70, rating: 4.6 },
  { id: 'ayurveda-essentials', name: "Ayurveda Essentials", ordersThisWeek: 90, rating: 4.9 },
  { id: 'sweet-delights', name: "Sweet Delights", ordersThisWeek: 140, rating: 4.9 },
  { id: 'green-valley-farms', name: "Green Valley Farms", ordersThisWeek: 100, rating: 4.7 },
  { id: 'artful-designs', name: "Artful Designs", ordersThisWeek: 40, rating: 4.6 },
  { id: 'natures-secret', name: "Nature's Secret", ordersThisWeek: 60, rating: 4.8 },
];

const getTopSellersForExplore = (sellers: typeof mockSellersForExplore, count = 3) => {
  return [...sellers]
    .sort((a, b) => {
      if (b.ordersThisWeek !== a.ordersThisWeek) {
        return b.ordersThisWeek - a.ordersThisWeek;
      }
      return b.rating - a.rating;
    })
    .slice(0, count)
    .map(seller => seller.id);
};
// END OF COPIED MOCK DATA

import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Star, Clock, Truck, PlayCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const categories = [
  { name: "All", icon: "🏠", active: true },
  { name: "Fresh Vegetables", icon: "🥬", active: false },
  { name: "Fresh Fruits", icon: "🍎", active: false },
  { name: "Ghar ka Khana", icon: "🍛", active: false },
  { name: "Natural Cosmetics", icon: "🧴", active: false },
  { name: "Handmade Crafts", icon: "🎨", active: false },
  { name: "Festival Specials", icon: "🪔", active: false },
];

const products = [
  {
    id: 1,
    name: "Homemade Pickle Combo",
    seller: "Sunita Devi",
    price: "₹299",
    originalPrice: "₹399",
    discount: "25% OFF",
    rating: 4.8,
    deliveryTime: "10 MINS",
    image: "https://source.unsplash.com/400x300/?homemade,pickle,combo",
    badge: "🌟 Top Seller",
    verified: true,
    category: "Ghar ka Khana",
    kitchenVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example video
  },
  {
    id: 2,
    name: "Fresh Bottle Gourd",
    seller: "Radha Kitchen",
    price: "₹22",
    originalPrice: "₹29",
    discount: "24% OFF",
    rating: 4.6,
    deliveryTime: "10 MINS",
    image: "https://source.unsplash.com/400x300/?bottle,gourd",
    badge: "Fresh Daily",
    verified: true,
    category: "Fresh Vegetables",
    kitchenVideoUrl: null
  },
  {
    id: 3,
    name: "Natural Face Pack",
    seller: "Meera's Beauty",
    price: "₹149",
    originalPrice: "₹199",
    discount: "25% OFF",
    rating: 4.9,
    deliveryTime: "30 MINS",
    image: "https://source.unsplash.com/400x300/?natural,face,pack",
    badge: "Chemical Free",
    verified: true,
    category: "Natural Cosmetics"
  },
  {
    id: 4,
    name: "Handmade Diya Set",
    seller: "Artisan Crafts",
    price: "₹199",
    originalPrice: "₹299",
    discount: "33% OFF",
    rating: 4.7,
    deliveryTime: "1 DAY",
    image: "https://source.unsplash.com/400x300/?handmade,diya,set",
    badge: "Festival Special",
    verified: true,
    category: "Handmade Crafts"
  },
  {
    id: 5,
    name: "Student Tiffin Pack",
    seller: "Amma's Kitchen",
    price: "₹120",
    originalPrice: "₹150",
    discount: "20% OFF",
    rating: 4.8,
    deliveryTime: "15 MINS",
    image: "https://source.unsplash.com/400x300/?student,tiffin,pack",
    badge: "Nutritious",
    verified: true,
    category: "Ghar ka Khana"
  },
  {
    id: 6,
    name: "Fresh Mangoes",
    seller: "Farm Fresh",
    price: "₹34",
    originalPrice: "₹45",
    discount: "24% OFF",
    rating: 4.5,
    deliveryTime: "10 MINS",
    image: "https://source.unsplash.com/400x300/?fresh,mangoes",
    badge: "Seasonal",
    verified: true,
    category: "Fresh Fruits"
  },
  // Additional products for variety
  {
    id: 7,
    name: "Homemade Kheer",
    seller: "Mamta's Kitchen",
    price: "₹89",
    originalPrice: "₹120",
    discount: "26% OFF",
    rating: 4.7,
    deliveryTime: "20 MINS",
    image: "https://source.unsplash.com/400x300/?homemade,kheer",
    badge: "Fresh Made",
    verified: true,
    category: "Ghar ka Khana"
  },
  {
    id: 8,
    name: "Herbal Hair Oil",
    seller: "Nature's Touch",
    price: "₹199",
    originalPrice: "₹250",
    discount: "20% OFF",
    rating: 4.6,
    deliveryTime: "45 MINS",
    image: "https://source.unsplash.com/400x300/?herbal,hair,oil",
    badge: "Organic",
    verified: true,
    category: "Natural Cosmetics"
  },
  {
    id: 9,
    name: "Handwoven Bag",
    seller: "Kiran Crafts",
    price: "₹299",
    originalPrice: "₹399",
    discount: "25% OFF",
    rating: 4.8,
    deliveryTime: "2 DAYS",
    image: "https://source.unsplash.com/400x300/?handwoven,bag",
    badge: "Eco-Friendly",
    verified: true,
    category: "Handmade Crafts"
  },
  {
    id: 10,
    name: "Organic Carrots",
    seller: "Fresh Farm",
    price: "₹18",
    originalPrice: "₹25",
    discount: "28% OFF",
    rating: 4.4,
    deliveryTime: "10 MINS",
    image: "https://source.unsplash.com/400x300/?organic,carrots",
    badge: "Farm Fresh",
    verified: true,
    category: "Fresh Vegetables"
  },
  {
    id: 11,
    name: "Fresh Apples",
    seller: "Hill Station Fruits",
    price: "₹45",
    originalPrice: "₹60",
    discount: "25% OFF",
    rating: 4.6,
    deliveryTime: "15 MINS",
    image: "https://source.unsplash.com/400x300/?fresh,apples",
    badge: "Premium",
    verified: true,
    category: "Fresh Fruits"
  },
  {
    id: 12,
    name: "Turmeric Face Scrub",
    seller: "Ayurveda Essentials",
    price: "₹129",
    originalPrice: "₹179",
    discount: "28% OFF",
    rating: 4.9,
    deliveryTime: "30 MINS",
    image: "https://source.unsplash.com/400x300/?turmeric,face,scrub",
    badge: "Natural",
    verified: true,
    category: "Natural Cosmetics"
  },
  {
    id: 13,
    name: "Homemade Gulab Jamun",
    seller: "Sweet Delights",
    price: "₹199",
    originalPrice: "₹249",
    discount: "20% OFF",
    rating: 4.9,
    deliveryTime: "45 MINS",
    image: "https://source.unsplash.com/400x300/?gulab,jamun",
    badge: "Festive Favorite",
    verified: true,
    category: "Ghar ka Khana"
  },
  {
    id: 14,
    name: "Organic Spinach",
    seller: "Green Valley Farms",
    price: "₹25",
    originalPrice: "₹35",
    discount: "28% OFF",
    rating: 4.7,
    deliveryTime: "10 MINS",
    image: "https://source.unsplash.com/400x300/?organic,spinach",
    badge: "Fresh & Healthy",
    verified: true,
    category: "Fresh Vegetables"
  },
  {
    id: 15,
    name: "Handpainted Coasters (Set of 4)",
    seller: "Artful Designs",
    price: "₹249",
    originalPrice: "₹300",
    discount: "17% OFF",
    rating: 4.6,
    deliveryTime: "2 DAYS",
    image: "https://source.unsplash.com/400x300/?handpainted,coasters",
    badge: "Unique Gift",
    verified: true,
    category: "Handmade Crafts"
  },
  {
    id: 16,
    name: "Aloe Vera Gel (Pure)",
    seller: "Nature's Secret",
    price: "₹99",
    originalPrice: "₹120",
    discount: "17% OFF",
    rating: 4.8,
    deliveryTime: "20 MINS",
    image: "https://source.unsplash.com/400x300/?aloe,vera,gel",
    badge: "Soothing",
    verified: true,
    category: "Natural Cosmetics"
  }
];

const ExploreProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const HEADER_HEIGHT_OFFSET = "72px";

  const topSellerIds = useMemo(() => getTopSellersForExplore(mockSellersForExplore), []);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-grow flex"> {/* Main content area */}
        {/* Left Panel: Categories */}
        {/* Added 'hidden md:block' to hide on mobile, showing only products then */}
        <aside className="hidden md:block w-64 lg:w-72 pr-6">
          <div
            className="sticky overflow-y-auto h-[calc(100vh-var(--header-height)-2rem)] scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent"
            style={{ top: HEADER_HEIGHT_OFFSET, '--header-height': HEADER_HEIGHT_OFFSET } as React.CSSProperties}
          >
            <h2 className="text-xl font-semibold mb-4 text-ethnic-primary font-heading">Categories</h2>
            <nav className="flex flex-col space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  className={`flex items-center gap-2 whitespace-nowrap justify-start text-md px-3 py-2 h-auto ${
                    selectedCategory === category.name ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Panel: Products and Filters */}
        <main className="flex-1 min-w-0"> {/* min-w-0 is important for flex item to shrink properly */}
          {/* Search & Filters (remains at top of product list) */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search within products..." // Changed placeholder
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                Sort
              </Button>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Categories - shown only if left panel is hidden */}
          <div className="md:hidden flex overflow-x-auto gap-3 mb-6 pb-2 scrollbar-thin">
            {categories.map((category) => (
              <Button
                key={`mobile-${category.name}`}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2 whitespace-nowrap px-3 py-1 h-auto"
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="text-md">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>


          {/* Top Banner (Optional, can be kept or removed based on preference) */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-heading font-bold text-ethnic-primary mb-2">
              Special seasonal vegetables
            </h2>
            <p className="text-muted-foreground">
              Get bottle gourds, pumpkins & more
            </p>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-semibold text-muted-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try selecting a different category or refining your search.</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' // Adjusted grid for wider content area
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-warm transition-all duration-300 flex flex-col">
                  <CardContent className="p-0 flex flex-col flex-grow">
                    <div className="relative h-48 bg-gradient-to-br from-accent/20 to-primary/20 rounded-t-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                          {product.badge}
                        </Badge>
                      </div>
                      {product.verified && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-trust-green text-ethnic-primary border-0 text-xs px-2 py-1">
                            ✓ Gruhini Verified
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3">
                        <Badge variant="outline" className="bg-background/90 text-ethnic-primary border-0 text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {product.deliveryTime}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-ethnic-primary mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Link to={`/seller/${product.seller.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition-colors">
                          by {product.seller}
                        </Link>
                        {/* Check if seller is a top seller */}
                        {mockSellersForExplore.find(s => s.name === product.seller && topSellerIds.includes(s.id)) && (
                          <Star className="h-4 w-4 fill-amber-400 text-amber-500 ml-1" title="Top Seller" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-ethnic-primary">
                          {product.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                        <span className="text-sm text-primary font-medium">
                          {product.discount}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-auto pt-3"> {/* mt-auto to push buttons to bottom */}
                        <Button variant="ethnic" className="w-full">
                          ADD
                        </Button>
                        {product.kitchenVideoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-auto px-3"
                            onClick={() => console.log("View kitchen video:", product.kitchenVideoUrl)}
                          >
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 bg-primary/10 rounded-lg p-4 flex items-center gap-3">
            <Truck className="h-6 w-6 text-primary" />
            <div>
              <p className="font-medium text-ethnic-primary">Get FREE delivery</p>
              <p className="text-sm text-muted-foreground">on your order above ₹199</p>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExploreProducts;
export { products };