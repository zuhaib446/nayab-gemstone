import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid featured={true} />
      <ProductGrid />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Nayab Gemstone</h3>
              <p className="text-gray-300 mb-4">
                The world's premier destination for authentic, high-quality gemstones. 
                Each piece is carefully selected and certified for its exceptional beauty and value.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Certification</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>+1 (555) 123-4567</li>
                <li>info@nayabgemstone.com</li>
                <li>123 Gemstone Avenue</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Nayab Gemstone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}