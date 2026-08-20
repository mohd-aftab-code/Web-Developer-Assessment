import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

// Schemas
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Seed Categories
    const electronics = await Category.create({
      name: "Electronics",
      slug: "electronics",
      description: "Latest gadgets and electronics.",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    });

    const fashion = await Category.create({
      name: "Fashion",
      slug: "fashion",
      description: "Trending fashion and apparel.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    });

    const home = await Category.create({
      name: "Home & Living",
      slug: "home-living",
      description: "Modern furniture and decor for your space.",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    });

    const beauty = await Category.create({
      name: "Beauty & Personal Care",
      slug: "beauty",
      description: "Premium skincare and beauty essentials.",
      image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    });

    console.log("Categories seeded");

    // Seed Products
    await Product.insertMany([
      // Electronics
      {
        name: "Wireless Noise-Cancelling Headphones",
        slug: "wireless-headphones",
        description: "Experience premium sound with industry-leading noise cancellation. Features 30-hour battery life and supreme comfort.",
        price: 299.99,
        category: electronics._id,
        stock: 50,
        featured: true,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Minimalist Smartwatch Series 8",
        slug: "minimalist-smartwatch-s8",
        description: "Track your fitness, heart rate, and stay connected with this sleek smartwatch. Water-resistant up to 50m.",
        price: 349.50,
        category: electronics._id,
        stock: 100,
        featured: true,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Ultra-Thin Laptop Pro",
        slug: "ultra-thin-laptop",
        description: "Lightweight, powerful, and designed for professionals. 16GB RAM, 512GB SSD.",
        price: 1299.00,
        category: electronics._id,
        stock: 15,
        featured: false,
        images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Professional DSLR Camera",
        slug: "pro-dslr-camera",
        description: "Capture stunning 4K video and high-resolution images with this professional-grade DSLR.",
        price: 899.99,
        category: electronics._id,
        stock: 10,
        featured: false,
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },

      // Fashion
      {
        name: "Classic Leather Biker Jacket",
        slug: "classic-leather-jacket",
        description: "A timeless classic leather jacket for any occasion. Made from 100% genuine full-grain leather.",
        price: 149.00,
        category: fashion._id,
        stock: 20,
        featured: true,
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Urban Casual Sneakers",
        slug: "urban-casual-sneakers",
        description: "Comfortable and stylish everyday sneakers with breathable mesh and durable soles.",
        price: 89.99,
        category: fashion._id,
        stock: 75,
        featured: true,
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Vintage Denim Jeans",
        slug: "vintage-denim-jeans",
        description: "Premium washed denim with a relaxed fit. The perfect everyday staple.",
        price: 59.99,
        category: fashion._id,
        stock: 120,
        featured: false,
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Elegant Evening Dress",
        slug: "elegant-evening-dress",
        description: "A stunning floor-length evening dress perfect for formal events and galas.",
        price: 199.99,
        category: fashion._id,
        stock: 15,
        featured: false,
        images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },

      // Home & Living
      {
        name: "Minimalist Ceramic Vase",
        slug: "minimalist-ceramic-vase",
        description: "Add a touch of elegance to any room with this handcrafted matte ceramic vase.",
        price: 45.00,
        category: home._id,
        stock: 40,
        featured: true,
        images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Ergonomic Office Chair",
        slug: "ergonomic-office-chair",
        description: "Work in comfort with our top-rated ergonomic chair featuring lumbar support.",
        price: 249.99,
        category: home._id,
        stock: 25,
        featured: false,
        images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },

      // Beauty
      {
        name: "Hydrating Facial Serum",
        slug: "hydrating-facial-serum",
        description: "Revitalize your skin with our vitamin C and hyaluronic acid infused daily serum.",
        price: 34.50,
        category: beauty._id,
        stock: 200,
        featured: true,
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Organic Body Butter",
        slug: "organic-body-butter",
        description: "Deeply moisturizing shea butter blend, 100% organic and cruelty-free.",
        price: 24.00,
        category: beauty._id,
        stock: 150,
        featured: false,
        images: ["https://images.unsplash.com/photo-1608248593842-83b33364f9b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      },
    ]);
    console.log("Products seeded");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
