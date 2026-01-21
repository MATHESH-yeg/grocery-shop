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
    imageUrl: '/images/tomato.png',
    stock: 50,
  },
  {
    name: 'Organic Carrots',
    description: 'Fresh, crunchy carrots rich in beta-carotene. Great for salads and cooking.',
    price: 60.00,
    category: 'Vegetables',
    imageUrl: '/images/carrot.png',
    stock: 40,
  },
  {
    name: 'Green Bell Peppers',
    description: 'Crisp and fresh bell peppers. Perfect for stir-fries and salads.',
    price: 80.00,
    category: 'Vegetables',
    imageUrl: '/images/bell-peppers.png',
    stock: 30,
  },
  {
    name: 'Fresh Spinach',
    description: 'Tender, leafy spinach packed with iron and vitamins. Ideal for salads and smoothies.',
    price: 20.00,
    category: 'Vegetables',
    imageUrl: '/images/spinach.png',
    stock: 25,
  },
  // Fruits
  {
    name: 'Red Apples',
    description: 'Sweet, crisp red apples. Perfect for snacking and baking.',
    price: 120.00,
    category: 'Fruits',
    imageUrl: '/images/apples.png',
    stock: 60,
  },
  {
    name: 'Bananas',
    description: 'Ripe, yellow bananas. Rich in potassium and energy.',
    price: 30.00,
    category: 'Fruits',
    imageUrl: '/images/banana.png',
    stock: 80,
  },
  {
    name: 'Apple Juice',
    description: 'Fresh apple juice. Natural and refreshing.',
    price: 25.00,
    category: 'Beverages',
    imageUrl: '/images/applejuice.png',
    stock: 35,
  },
  // Snacks
  {
    name: 'Mixed Nuts',
    description: 'Premium mixed nuts. Almonds, cashews, and walnuts.',
    price: 250.00,
    category: 'Snacks',
    imageUrl: '/images/mixnuts.png',
    stock: 25,
  },
  {
    name: 'Granola Bars',
    description: 'Crunchy granola bars. Perfect for on-the-go snacking.',
    price: 50.00,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    stock: 40,
  },
  {
    name: 'Dark Chocolate',
    description: 'Premium dark chocolate. 70% cocoa, rich and smooth.',
    price: 70.00,
    category: 'Snacks',
    imageUrl: '/images/dark.png',
    stock: 35,
  },
  // Dairy
  {
    name: 'Fresh Milk',
    description: 'Whole milk. Fresh from local farms. 1 liter pack.',
    price: 23.00,
    category: 'Dairy',
    imageUrl: '/images/milk.png',
    stock: 50,
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt. High in protein and probiotics.',
    price: 35.00,
    category: 'Dairy',
    imageUrl: '/images/yogurt.png',
    stock: 30,
  },
  {
    name: 'Cheese',
    description: 'Mozzarella cheese. Perfect for pizzas and salads.',
    price: 63.00,
    category: 'Dairy',
    imageUrl: '/images/cheese.png',
    stock: 25,
  },
  {
    name: 'Butter',
    description: 'Premium butter. Made from fresh cream.',
    price: 40.00,
    category: 'Dairy',
    imageUrl: '/images/butter.png',
    stock: 40,
  },
  {
    name: 'Eggs',
    description: 'Farm-fresh eggs. Pack of 12 eggs.',
    price: 200.00,
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
