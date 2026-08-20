import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import { ICategory } from "@/types";

export class CategoryService {
  /**
   * Fetch all categories
   */
  static async getAllCategories(): Promise<ICategory[]> {
    await connectToDatabase();
    return Category.find({}).exec();
  }
}
