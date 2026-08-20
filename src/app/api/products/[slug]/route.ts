import { NextResponse } from 'next/server';
import { ProductService } from '@/services/product.service';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await ProductService.getProductBySlug(params.slug);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
