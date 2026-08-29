require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');
const Admin = require('./models/Admin');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
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
  {
    name: '4K Action Camera',
    description: 'Waterproof 4K action camera with image stabilization, wide-angle lens, and dual-screen display. Includes mount kit.',
    price: 149.99,
    discount: 12,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    stock: 22,
    rating: 4.6,
    numReviews: 16,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches, aluminum frame, and programmable keys for work and gaming.',
    price: 89.99,
    discount: 8,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop',
    stock: 28,
    rating: 4.7,
    numReviews: 21,
  },
  {
    name: 'Denim Jacket Classic',
    description: 'Timeless denim jacket with a relaxed fit, button front, and dual chest pockets. Pairs well with casual and smart outfits.',
    price: 69.99,
    discount: 10,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    stock: 48,
    rating: 4.3,
    numReviews: 19,
  },
  {
    name: 'Casual Sneakers White',
    description: 'Everyday white sneakers with cushioned insole and rubber sole. Easy to clean and comfortable for all-day wear.',
    price: 59.99,
    discount: 5,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    stock: 70,
    rating: 4.5,
    numReviews: 33,
  },
  {
    name: 'Table Lamp Modern',
    description: 'Warm LED table lamp with adjustable brightness and USB charging port. Minimal design for desks and bedside tables.',
    price: 42.99,
    discount: 0,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    stock: 38,
    rating: 4.2,
    numReviews: 11,
  },
  {
    name: 'Cotton Bed Sheet Set',
    description: 'Queen-size 4-piece cotton bed sheet set. Soft, breathable, and machine washable. Includes fitted sheet, flat sheet, and two pillowcases.',
    price: 54.99,
    discount: 18,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
    stock: 42,
    rating: 4.4,
    numReviews: 27,
  },
  {
    name: 'Resistance Band Set',
    description: 'Set of 5 resistance bands with different tension levels, door anchor, and carry bag. Great for home workouts.',
    price: 21.99,
    discount: 0,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop',
    stock: 85,
    rating: 4.3,
    numReviews: 24,
  },
  {
    name: 'Adjustable Dumbbells (Pair)',
    description: 'Space-saving adjustable dumbbell pair for strength training at home. Quick weight changes from 5 to 25 lb each.',
    price: 159.99,
    discount: 10,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=300&fit=crop',
    stock: 18,
    rating: 4.8,
    numReviews: 9,
  },
  {
    name: 'Cookbook: Easy Weeknight Meals',
    description: '100 simple recipes you can cook in 30 minutes or less. Includes vegetarian, chicken, and one-pan options.',
    price: 22.99,
    discount: 0,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    stock: 50,
    rating: 4.5,
    numReviews: 13,
  },
  {
    name: 'Productivity Planner 2026',
    description: 'Undated weekly planner with goal tracking, habit logs, and notes pages. Hardcover and lay-flat binding.',
    price: 18.99,
    discount: 5,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?w=400&h=300&fit=crop',
    stock: 95,
    rating: 4.1,
    numReviews: 7,
  },
  {
    name: 'Hydrating Face Moisturizer',
    description: 'Lightweight daily moisturizer with ceramides and niacinamide. Non-greasy formula for day and night use.',
    price: 27.99,
    discount: 8,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop',
    stock: 62,
    rating: 4.6,
    numReviews: 29,
  },
  {
    name: 'Makeup Brush Set',
    description: '12-piece professional makeup brush set with vegan bristles, travel pouch, and blending, contour, and eye brushes.',
    price: 32.99,
    discount: 15,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
    stock: 40,
    rating: 4.4,
    numReviews: 17,
  },
];

const dummyUsers = [
  {
    name: 'Aarav Sharma',
    email: 'aarav@shopez.com',
    password: 'user123',
    phone: '9876543210',
    address: '14 MG Road, Bengaluru',
    role: 'user',
  },
  {
    name: 'Priya Patel',
    email: 'priya@shopez.com',
    password: 'user123',
    phone: '9123456780',
    address: '88 Marine Drive, Mumbai',
    role: 'user',
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan@shopez.com',
    password: 'user123',
    phone: '9988776655',
    address: '22 Connaught Place, New Delhi',
    role: 'user',
  },
];

function discountedPrice(product) {
  return Number((product.price * (1 - (product.discount || 0) / 100)).toFixed(2));
}

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      Product.deleteMany({}),
      Order.deleteMany({}),
      Cart.deleteMany({}),
      User.deleteMany({ email: { $in: dummyUsers.map((u) => u.email) } }),
    ]);
    console.log('Cleared products, orders, carts, and demo users');

    const createdUsers = [];
    for (const user of dummyUsers) {
      createdUsers.push(await User.create(user));
    }
    console.log(`${createdUsers.length} demo users added`);

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

    const [aarav, priya, rohan] = createdUsers;
    const reviewComments = [
      { rating: 5, comment: 'Excellent quality. Arrived quickly and looks just like the photos.' },
      { rating: 4, comment: 'Good value for money. Would buy again.' },
      { rating: 5, comment: 'Loved it! Comfortable and well made.' },
    ];

    const productsWithReviews = products.map((product, index) => {
      const reviewers = [aarav, priya, rohan];
      const reviews = reviewers.slice(0, (index % 3) + 1).map((user, i) => ({
        user: user._id,
        name: user.name,
        rating: reviewComments[i].rating,
        comment: reviewComments[i].comment,
      }));
      const rating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      return {
        ...product,
        reviews,
        rating: Number(rating.toFixed(1)),
        numReviews: reviews.length,
      };
    });

    const createdProducts = await Product.insertMany(productsWithReviews);
    console.log(`${createdProducts.length} dummy products added`);

    const byName = Object.fromEntries(createdProducts.map((p) => [p.name, p]));

    const orderSpecs = [
      {
        user: aarav,
        status: 'Delivered',
        paid: true,
        items: [
          { product: byName['Wireless Bluetooth Headphones'], quantity: 1 },
          { product: byName['Wireless Charging Pad'], quantity: 1 },
        ],
        shippingAddress: {
          address: '14 MG Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          zipCode: '560001',
          country: 'India',
        },
      },
      {
        user: priya,
        status: 'Shipped',
        paid: true,
        items: [
          { product: byName['Natural Face Serum'], quantity: 2 },
          { product: byName['Makeup Brush Set'], quantity: 1 },
        ],
        shippingAddress: {
          address: '88 Marine Drive',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400002',
          country: 'India',
        },
      },
      {
        user: rohan,
        status: 'Processing',
        paid: false,
        items: [
          { product: byName['Running Shoes Ultra'], quantity: 1 },
          { product: byName['Yoga Mat Premium'], quantity: 1 },
        ],
        shippingAddress: {
          address: '22 Connaught Place',
          city: 'New Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India',
        },
      },
      {
        user: aarav,
        status: 'Cancelled',
        paid: false,
        items: [{ product: byName['Smart Watch Pro'], quantity: 1 }],
        shippingAddress: {
          address: '14 MG Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          zipCode: '560001',
          country: 'India',
        },
      },
    ];

    const orders = orderSpecs.map((spec) => {
      const items = spec.items.map(({ product, quantity }) => ({
        product: product._id,
        name: product.name,
        price: discountedPrice(product),
        image: product.image,
        quantity,
      }));
      const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const now = new Date();
      return {
        user: spec.user._id,
        items,
        shippingAddress: spec.shippingAddress,
        paymentMethod: spec.paid ? 'Online' : 'COD',
        totalPrice: Number(totalPrice.toFixed(2)),
        isPaid: spec.paid,
        paidAt: spec.paid ? now : undefined,
        orderStatus: spec.status,
        deliveredAt: spec.status === 'Delivered' ? now : undefined,
      };
    });

    await Order.insertMany(orders);
    console.log(`${orders.length} dummy orders added`);

    await Cart.create({
      user: priya._id,
      items: [
        {
          product: byName['Ceramic Coffee Mug Set']._id,
          name: byName['Ceramic Coffee Mug Set'].name,
          price: discountedPrice(byName['Ceramic Coffee Mug Set']),
          image: byName['Ceramic Coffee Mug Set'].image,
          quantity: 1,
        },
        {
          product: byName['Cookbook: Easy Weeknight Meals']._id,
          name: byName['Cookbook: Easy Weeknight Meals'].name,
          price: discountedPrice(byName['Cookbook: Easy Weeknight Meals']),
          image: byName['Cookbook: Easy Weeknight Meals'].image,
          quantity: 2,
        },
      ],
    });
    console.log('Dummy cart added for Priya');

    const settings = await Admin.findOne({});
    const categories = [
      { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop' },
      { name: 'Clothing', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=100&h=100&fit=crop' },
      { name: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop' },
      { name: 'Sports', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop' },
      { name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop' },
      { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop' },
    ];

    if (!settings) {
      await Admin.create({
        bannerTitle: 'Welcome to ShopEZ',
        bannerSubtitle: 'Discover amazing products at great prices',
        categories,
      });
      console.log('Admin settings created');
    } else {
      settings.bannerTitle = settings.bannerTitle || 'Welcome to ShopEZ';
      settings.bannerSubtitle = settings.bannerSubtitle || 'Discover amazing products at great prices';
      settings.categories = categories;
      await settings.save();
      console.log('Admin settings updated');
    }

    console.log('\nSeed completed successfully!');
    console.log('Admin login:  admin@shopez.com / admin123');
    console.log('Demo users:   aarav@shopez.com, priya@shopez.com, rohan@shopez.com');
    console.log('User password: user123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
