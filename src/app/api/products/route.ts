import { NextResponse } from 'next/server';
import { ProductService } from '@/services/product.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const search = searchParams.get('search');
    
    const products = await ProductService.getProducts({ categorySlug, search });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
