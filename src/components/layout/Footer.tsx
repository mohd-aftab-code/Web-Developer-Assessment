import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              SLEKCO<span className="text-blue-600">.</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              A premium, modern e-commerce experience showcasing the best products across various categories.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-gray-600 hover:text-black">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="text-sm text-gray-600 hover:text-black">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="text-sm text-gray-600 hover:text-black">Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-black">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Slekco. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
