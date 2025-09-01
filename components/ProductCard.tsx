'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        stock: product.stock,
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-600">
                Featured
              </Badge>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg">
                  Out of Stock
                </Badge>
              </div>
            )}
            <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{product.category.name}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {product.ratings.average.toFixed(1)} ({product.ratings.count})
                </span>
              </div>
            </div>
            
            <Link href={`/products/${product._id}`}>
              <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toLocaleString()}
                </span>
                <p className="text-xs text-muted-foreground">{product.weight}ct</p>
              </div>
              <Badge variant={product.stock > 10 ? "secondary" : "destructive"}>
                {product.stock} in stock
              </Badge>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <div className="flex w-full space-x-2">
            <Link href={`/products/${product._id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            <Button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}