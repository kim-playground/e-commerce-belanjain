require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
    price: 299000,
    category: "Electronics",
    image_url:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 50,
    rating: 4.5,
    reviews_count: 128,
    is_featured: true,
    tags: ["wireless", "audio", "bluetooth", "noise-cancelling"],
  },
  {
    name: "Smart Watch Series 7",
    description:
      "Advanced fitness tracking, heart rate monitoring, GPS, and water resistance. Stay connected with notifications and calls on your wrist.",
    price: 499000,
    category: "Electronics",
    image_url:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 30,
    rating: 4.7,
    reviews_count: 256,
    is_featured: true,
    tags: ["smartwatch", "fitness", "wearable"],
  },
  {
    name: "Premium Cotton T-Shirt",
    description:
      "Comfortable 100% organic cotton t-shirt with modern fit. Available in multiple colors. Perfect for everyday wear.",
    price: 149000,
    category: "Clothing",
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 100,
    rating: 4.3,
    reviews_count: 89,
    is_featured: false,
    tags: ["cotton", "casual", "comfortable"],
  },
  {
    name: "Yoga Mat Pro",
    description:
      "Non-slip, eco-friendly yoga mat with extra cushioning. Includes carrying strap. Perfect for yoga, pilates, and home workouts.",
    price: 199000,
    category: "Sports",
    image_url:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    stock: 75,
    rating: 4.6,
    reviews_count: 145,
    is_featured: true,
    tags: ["yoga", "fitness", "eco-friendly"],
  },
  {
    name: "Stainless Steel Water Bottle",
    description:
      "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design.",
    price: 129000,
    category: "Sports",
    image_url:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    stock: 120,
    rating: 4.4,
    reviews_count: 203,
    is_featured: false,
    tags: ["water-bottle", "insulated", "eco-friendly"],
  },
  {
    name: "Modern Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness and color temperature. USB charging port included. Perfect for home office.",
    price: 179000,
    category: "Home & Garden",
    image_url:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    stock: 45,
    rating: 4.5,
    reviews_count: 67,
    is_featured: false,
    tags: ["lamp", "led", "office"],
  },
  {
    name: "Bestseller Novel Collection",
    description:
      "Set of 3 bestselling novels from award-winning authors. Perfect gift for book lovers.",
    price: 249000,
    category: "Books",
    image_url:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    stock: 60,
    rating: 4.8,
    reviews_count: 312,
    is_featured: true,
    tags: ["books", "fiction", "bestseller"],
  },
  {
    name: "Leather Backpack",
    description:
      "Genuine leather backpack with laptop compartment. Stylish and durable for work or travel.",
    price: 599000,
    category: "Other",
    image_url:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 25,
    rating: 4.6,
    reviews_count: 94,
    is_featured: true,
    tags: ["backpack", "leather", "travel"],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert seed data
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${createdProducts.length} products`);

    console.log("\n📦 Sample Products:");
    createdProducts.slice(0, 3).forEach((product) => {
      console.log(
        `   - ${product.name} (${
          product.category
        }) - Rp ${product.price.toLocaleString()}`
      );
    });

    console.log("\n🎉 Database seeded successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
  }
};

seedDatabase();
