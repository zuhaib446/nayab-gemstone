const mongoose = require('mongoose');

// Simple schema definitions for seeding
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  slug: String,
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  weight: Number,
  origin: String,
  clarity: String,
  cut: String,
  color: String,
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
}, { timestamps: true });

const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nayab-gemstone';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Create models
const User = mongoose.model('User', UserSchema);
const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);

// Sample data
const categories = [
  {
    name: 'Diamonds',
    description: 'Premium certified diamonds in various cuts and colors',
    image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
    slug: 'diamonds',
  },
  {
    name: 'Rubies',
    description: 'Exquisite red rubies from Burma and other renowned sources',
    image: 'https://images.pexels.com/photos/1616432/pexels-photo-1616432.jpeg',
    slug: 'rubies',
  },
  {
    name: 'Sapphires',
    description: 'Beautiful blue and fancy colored sapphires',
    image: 'https://images.pexels.com/photos/1616428/pexels-photo-1616428.jpeg',
    slug: 'sapphires',
  },
  {
    name: 'Emeralds',
    description: 'Vibrant green emeralds from Colombia and Zambia',
    image: 'https://images.pexels.com/photos/1616434/pexels-photo-1616434.jpeg',
    slug: 'emeralds',
  },
  {
    name: 'Precious Stones',
    description: 'Other precious and semi-precious gemstones',
    image: 'https://images.pexels.com/photos/1616435/pexels-photo-1616435.jpeg',
    slug: 'precious-stones',
  },
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@nayabgemstone.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Customer',
    email: 'john@example.com',
    password: 'customer123',
    role: 'customer',
  },
];

async function createUsers() {
  console.log('Creating users...');
  
  for (const userData of users) {
    const existingUser = await User.findOne({ email: userData.email });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      await User.create({
        ...userData,
        password: hashedPassword,
      });
      console.log(`Created user: ${userData.email}`);
    }
  }
}

async function createCategories() {
  console.log('Creating categories...');
  
  const createdCategories = [];
  
  for (const categoryData of categories) {
    const existingCategory = await Category.findOne({ slug: categoryData.slug });
    if (!existingCategory) {
      const category = await Category.create(categoryData);
      createdCategories.push(category);
      console.log(`Created category: ${categoryData.name}`);
    } else {
      createdCategories.push(existingCategory);
    }
  }
  
  return createdCategories;
}

async function createProducts(categories) {
  console.log('Creating products...');
  
  const products = [
    {
      name: 'Royal Blue Sapphire',
      description: 'A stunning 3.5-carat royal blue sapphire from Kashmir, known for its exceptional color and clarity. This rare gemstone exhibits the coveted velvety blue hue that Kashmir sapphires are famous for.',
      price: 15000,
      images: [
        'https://images.pexels.com/photos/1616428/pexels-photo-1616428.jpeg',
        'https://images.pexels.com/photos/1616429/pexels-photo-1616429.jpeg',
      ],
      stock: 3,
      featured: true,
      weight: 3.5,
      origin: 'Kashmir',
      clarity: 'VS1',
      cut: 'Oval',
      color: 'Royal Blue',
      ratings: { average: 4.9, count: 12 },
    },
    {
      name: 'Burmese Ruby',
      description: 'Exceptional 2.8-carat Burmese ruby with pigeon blood red color. This natural, unheated ruby displays the finest color saturation and transparency.',
      price: 18500,
      images: [
        'https://images.pexels.com/photos/1616432/pexels-photo-1616432.jpeg',
        'https://images.pexels.com/photos/1616433/pexels-photo-1616433.jpeg',
      ],
      stock: 2,
      featured: true,
      weight: 2.8,
      origin: 'Myanmar',
      clarity: 'VVS2',
      cut: 'Cushion',
      color: 'Pigeon Blood Red',
      ratings: { average: 5.0, count: 8 },
    },
    {
      name: 'Colombian Emerald',
      description: 'Beautiful 4.2-carat Colombian emerald with vivid green color and good transparency. Sourced from the famous Muzo mines.',
      price: 12000,
      images: [
        'https://images.pexels.com/photos/1616434/pexels-photo-1616434.jpeg',
      ],
      stock: 5,
      featured: true,
      weight: 4.2,
      origin: 'Colombia',
      clarity: 'VS2',
      cut: 'Emerald',
      color: 'Vivid Green',
      ratings: { average: 4.8, count: 15 },
    },
    {
      name: 'Brilliant Cut Diamond',
      description: 'Flawless 1.5-carat round brilliant cut diamond with D color grade. Certified by GIA with excellent cut quality.',
      price: 22000,
      images: [
        'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
        'https://images.pexels.com/photos/1616404/pexels-photo-1616404.jpeg',
      ],
      stock: 4,
      featured: true,
      weight: 1.5,
      origin: 'South Africa',
      clarity: 'FL',
      cut: 'Round Brilliant',
      color: 'D',
      ratings: { average: 5.0, count: 20 },
    },
    {
      name: 'Pink Tourmaline',
      description: 'Gorgeous 6.3-carat pink tourmaline with excellent clarity and beautiful pink hue. Perfect for custom jewelry settings.',
      price: 3500,
      images: [
        'https://images.pexels.com/photos/1616435/pexels-photo-1616435.jpeg',
      ],
      stock: 8,
      featured: false,
      weight: 6.3,
      origin: 'Brazil',
      clarity: 'VVS1',
      cut: 'Oval',
      color: 'Pink',
      ratings: { average: 4.7, count: 6 },
    },
    {
      name: 'Ceylon Blue Sapphire',
      description: 'Natural Ceylon blue sapphire with cornflower blue color. This 2.2-carat stone has excellent transparency and brilliance.',
      price: 8500,
      images: [
        'https://images.pexels.com/photos/1616430/pexels-photo-1616430.jpeg',
      ],
      stock: 6,
      featured: false,
      weight: 2.2,
      origin: 'Sri Lanka',
      clarity: 'VS1',
      cut: 'Round',
      color: 'Cornflower Blue',
      ratings: { average: 4.6, count: 9 },
    },
  ];

  for (const productData of products) {
    // Find appropriate category
    let categoryId;
    if (productData.name.toLowerCase().includes('sapphire')) {
      categoryId = categories.find(c => c.slug === 'sapphires')?._id;
    } else if (productData.name.toLowerCase().includes('ruby')) {
      categoryId = categories.find(c => c.slug === 'rubies')?._id;
    } else if (productData.name.toLowerCase().includes('emerald')) {
      categoryId = categories.find(c => c.slug === 'emeralds')?._id;
    } else if (productData.name.toLowerCase().includes('diamond')) {
      categoryId = categories.find(c => c.slug === 'diamonds')?._id;
    } else {
      categoryId = categories.find(c => c.slug === 'precious-stones')?._id;
    }

    const existingProduct = await Product.findOne({ name: productData.name });
    if (!existingProduct) {
      await Product.create({
        ...productData,
        category: categoryId,
      });
      console.log(`Created product: ${productData.name}`);
    }
  }
}

async function seedDatabase() {
  try {
    await connectDB();
    
    console.log('Starting database seeding...');
    
    await createUsers();
    const createdCategories = await createCategories();
    await createProducts(createdCategories);
    
    console.log('Database seeding completed successfully!');
    console.log('\nDefault Admin Account:');
    console.log('Email: admin@nayabgemstone.com');
    console.log('Password: admin123');
    console.log('\nDefault Customer Account:');
    console.log('Email: john@example.com');
    console.log('Password: customer123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

// Run the seeder
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };