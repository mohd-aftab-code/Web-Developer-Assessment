import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { IProduct } from "@/types";

export class ProductService {
  /**
   * Fetch products with optional filtering
   */
  static async getProducts(filters: { categorySlug?: string | null; search?: string | null }): Promise<IProduct[]> {
    await connectToDatabase();
    
    const query: any = {};
    
    if (filters.categorySlug) {
      const category = await Category.findOne({ slug: filters.categorySlug });
      if (category) {
        query.category = category._id;
      }
    }
    
    if (filters.search) {
      query.name = { $regex: filters.search, $options: 'i' };
    }

    return Product.find(query).populate('category').exec();
  }

  /**
   * Fetch a single product by slug
   */
  static async getProductBySlug(slug: string): Promise<IProduct | null> {
    await connectToDatabase();
    // Ensure Category is registered for populate
    const _categoryModel = Category; 
    return Product.findOne({ slug }).populate('category').exec();
  }
}
