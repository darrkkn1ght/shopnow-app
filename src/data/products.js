// Dummy product data for ShopNow app
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviews: 234,
    description: "Premium wireless headphones with active noise cancellation technology. Perfect for music lovers and professionals who demand crystal-clear audio quality.",
    features: ["Active Noise Cancellation", "30h Battery Life", "Quick Charge", "Bluetooth 5.0"],
    inStock: true,
    discount: 23
  },
  {
    id: 2,
    name: "Smartwatch Series 5",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 456,
    description: "Advanced smartwatch with health monitoring, GPS tracking, and seamless smartphone integration. Track your fitness goals and stay connected.",
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-Day Battery"],
    inStock: true,
    discount: 14
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    rating: 4.3,
    reviews: 189,
    description: "Handcrafted genuine leather wallet with multiple card slots and bill compartments. Classic design meets modern functionality.",
    features: ["Genuine Leather", "RFID Protection", "Multiple Compartments", "Compact Design"],
    inStock: true,
    discount: 29
  },
  {
    id: 4,
    name: "Sneakers AirX",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.6,
    reviews: 324,
    description: "Premium athletic sneakers with advanced cushioning technology. Perfect for running, training, or casual wear with superior comfort.",
    features: ["Air Cushioning", "Breathable Mesh", "Durable Sole", "Lightweight Design"],
    inStock: true,
    discount: 19
  },
  {
    id: 5,
    name: "Backpack Classic",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    rating: 4.4,
    reviews: 267,
    description: "Durable and spacious backpack perfect for daily commute, travel, or outdoor adventures. Multiple compartments for organized storage.",
    features: ["Water Resistant", "Laptop Compartment", "Ergonomic Straps", "Multiple Pockets"],
    inStock: true,
    discount: 20
  },
  {
    id: 6,
    name: "Sunglasses Vintage",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Accessories",
    rating: 4.2,
    reviews: 145,
    description: "Classic vintage-style sunglasses with UV protection. Timeless design that complements any outfit while protecting your eyes.",
    features: ["UV Protection", "Polarized Lenses", "Durable Frame", "Vintage Style"],
    inStock: true,
    discount: 25
  },
  {
    id: 7,
    name: "Bluetooth Speaker Mini",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.1,
    reviews: 298,
    description: "Compact portable Bluetooth speaker with surprising sound quality. Perfect for outdoor activities, travel, or home use.",
    features: ["Wireless Connectivity", "12h Battery", "Water Resistant", "Compact Size"],
    inStock: true,
    discount: 25
  },
  {
    id: 8,
    name: "Fitness Tracker Pro",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 512,
    description: "Advanced fitness tracker with comprehensive health monitoring. Track workouts, sleep, heart rate, and achieve your fitness goals.",
    features: ["Multi-Sport Tracking", "Sleep Analysis", "Heart Rate Monitor", "14-Day Battery"],
    inStock: true,
    discount: 20
  }
];

// Categories for filtering
export const categories = [
  { id: 'all', name: 'All Products', icon: 'grid' },
  { id: 'electronics', name: 'Electronics', icon: 'phone' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt' },
  { id: 'accessories', name: 'Accessories', icon: 'briefcase' },
  { id: 'sports', name: 'Sports', icon: 'fitness' }
];

// Helper functions
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.5);
};

export const getDiscountedProducts = () => {
  return products.filter(product => product.discount > 0);
};

export default products; 
