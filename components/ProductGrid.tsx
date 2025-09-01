'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  stock: number;
  featured: boolean;
  weight: number;
  ratings: {
    average: number;
    count: number;
  };
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ProductGridProps {
  featured?: boolean;
}

export function ProductGrid({ featured = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProducts(true);
  }, [filters, featured]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (reset = false) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      
      if (filters.category) searchParams.set('category', filters.category);
      if (filters.search) searchParams.set('search', filters.search);
      if (filters.minPrice) searchParams.set('minPrice', filters.minPrice);
      if (filters.maxPrice) searchParams.set('maxPrice', filters.maxPrice);
      if (featured) searchParams.set('featured', 'true');
      
      searchParams.set('page', reset ? '1' : page.toString());
      searchParams.set('limit', '12');

      const response = await fetch(`/api/products?${searchParams}`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (reset) {
          setProducts(data.products);
          setPage(1);
        } else {
          setProducts(prev => [...prev, ...data.products]);
        }
        
        setHasMore(data.pagination.page < data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    fetchProducts(false);
  };

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            {featured ? 'Featured Gemstones' : 'Our Collection'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked precious and semi-precious stones from around the world
          </p>
        </motion.div>

        {!featured && (
          <div className="mb-8">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        )}

        {loading && products.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {products.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found</p>
              </div>
            )}

            {hasMore && !featured && (
              <div className="text-center mt-12">
                <Button 
                  onClick={loadMore} 
                  disabled={loading}
                  size="lg"
                  className="px-8"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}