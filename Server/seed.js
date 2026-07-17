require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Admin = require('./models/Admin');

const connectDB = require('./config/db');

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life, comfortable over-ear design, and crystal-clear audio quality.',
    price: 79.99,
    discount: 10,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    stock: 50,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Feature-packed smartwatch with heart rate monitor, GPS tracking, sleep analysis, and 7-day battery life. Water resistant up to 50m.',
    price: 199.99,
    discount: 15,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    stock: 30,
    rating: 4.7,
    numReviews: 8,
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft and breathable organic cotton t-shirt. Available in multiple colors. Perfect for everyday casual wear.',
    price: 29.99,
    discount: 0,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    stock: 100,
    rating: 4.2,
    numReviews: 25,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    price: 24.99,
    discount: 5,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    stock: 75,
    rating: 4.8,
    numReviews: 40,
  },
  {
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole. Ideal for daily training.',
    price: 129.99,
    discount: 20,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    stock: 40,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: 'Bestselling Novel Collection',
    description: 'A curated collection of 5 bestselling novels from award-winning authors. Perfect for book lovers and great as a gift.',
    price: 49.99,
    discount: 0,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    stock: 60,
    rating: 4.4,
    numReviews: 15,
  },
  {
    name: 'Natural Face Serum',
    description: 'Anti-aging face serum with vitamin C, hyaluronic acid, and natural botanical extracts. Suitable for all skin types.',
    price: 39.99,
    discount: 10,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    stock: 45,
    rating: 4.3,
    numReviews: 22,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof Bluetooth speaker with 360-degree sound, 12-hour playtime, and built-in microphone for hands-free calls.',
    price: 59.99,
    discount: 0,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    stock: 35,
    rating: 4.5,
    numReviews: 30,
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with alignment lines. Eco-friendly TPE material, perfect for yoga, pilates, and floor exercises.',
    price: 44.99,
    discount: 5,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop',
    stock: 55,
    rating: 4.6,
    numReviews: 20,
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Each mug holds 12oz. Modern minimalist design.',
    price: 34.99,
    discount: 0,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop',
    stock: 80,
    rating: 4.1,
    numReviews: 10,
  },
  {
    name: 'Leather Wallet',
    description: 'Genuine leather bifold wallet with RFID blocking technology. Features 8 card slots, 2 bill compartments, and a coin pocket.',
    price: 49.99,
    discount: 15,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    stock: 65,
    rating: 4.4,
    numReviews: 14,
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Slim design with LED indicator and overcharge protection.',
    price: 19.99,
    discount: 0,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    stock: 90,
    rating: 4.0,
    numReviews: 8,
  },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    console.log('Products cleared');

    // Insert products
    await Product.insertMany(products);
    console.log(`${products.length} products added`);

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@shopez.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@shopez.com',
        password: 'admin123',
        role: 'admin',
        phone: '0000000000',
      });
      console.log('Admin user created (email: admin@shopez.com, password: admin123)');
    } else {
      console.log('Admin user already exists');
    }

    // Create/update admin settings
    const settings = await Admin.findOne({});
    if (!settings) {
      await Admin.create({
        bannerTitle: 'Welcome to ShopEZ',
        bannerSubtitle: 'Discover amazing products at great prices',
        categories: [
          { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop' },
          { name: 'Clothing', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=100&h=100&fit=crop' },
          { name: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop' },
          { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=100&h=100&fit=crop' },
          { name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop' },
          { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop' },
        ],
      });
      console.log('Admin settings created');
    }

    console.log('\nSeed completed successfully!');
    console.log('Admin login: admin@shopez.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
