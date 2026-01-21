require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  // Vegetables
  {
    name: 'Tomatoes',
    description: 'Red, ripe tomatoes perfect for salads and cooking. Locally sourced and organic.',
    price: 45.00,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=800&q=80',
    stock: 50,
  },
  {
    name: 'Organic Carrots',
    description: 'Fresh, crunchy carrots rich in beta-carotene. Great for salads and cooking.',
    price: 60.00,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd3f?w=800&q=80',
    stock: 40,
  },
  {
    name: 'Green Bell Peppers',
    description: 'Crisp and fresh bell peppers. Perfect for stir-fries and salads.',
    price: 80.00,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1589482236814-c5a4d9522502?w=800&q=80',
    stock: 30,
  },
  {
    name: 'Fresh Spinach',
    description: 'Tender, leafy spinach packed with iron and vitamins. Ideal for salads and smoothies.',
    price: 35.00,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=800&q=80',
    stock: 25,
  },
  // Fruits
  {
    name: 'Red Apples',
    description: 'Sweet, crisp red apples. Perfect for snacking and baking.',
    price: 120.00,
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80',
    stock: 60,
  },
  {
    name: 'Bananas',
    description: 'Ripe, yellow bananas. Rich in potassium and energy.',
    price: 50.00,
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1528825876202-99c09650040c?w=800&q=80',
    stock: 80,
  },
  {
    name: 'Apple Juice',
    description: 'Fresh apple juice. Natural and refreshing.',
    price: 75.00,
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1606168091149-c8c4c330c64b?w=800&q=80',
    stock: 35,
  },
  {
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade. Sweet and tangy.',
    price: 55.00,
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1621263764250-717013328e46?w=800&q=80',
    stock: 30,
  },
  // Snacks
  {
    name: 'Mixed Nuts',
    description: 'Premium mixed nuts. Almonds, cashews, and walnuts.',
    price: 250.00,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=800&q=80',
    stock: 25,
  },
  {
    name: 'Granola Bars',
    description: 'Crunchy granola bars. Perfect for on-the-go snacking.',
    price: 120.00,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    stock: 40,
  },
  {
    name: 'Dark Chocolate',
    description: 'Premium dark chocolate. 70% cocoa, rich and smooth.',
    price: 200.00,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80',
    stock: 35,
  },
  // Dairy
  {
    name: 'Fresh Milk',
    description: 'Whole milk. Fresh from local farms. 1 liter pack.',
    price: 65.00,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=80',
    stock: 50,
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt. High in protein and probiotics.',
    price: 95.00,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    stock: 30,
  },
  {
    name: ' Cheese',
    description: 'Mozzarella cheese. Perfect for pizzas and salads.',
    price: 150.00,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800&q=80',
    stock: 25,
  },
  {
    name: 'Butter',
    description: 'Premium butter. Made from fresh cream.',
    price: 110.00,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7fe135a9d4?w=800&q=80',
    stock: 40,
  },
  {
    name: ' Eggs',
    description: 'Farm-fresh eggs. Pack of 12 eggs.',
    price: 90.00,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80',
    stock: 60,
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${sampleProducts.length} products with high-quality images`);

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
