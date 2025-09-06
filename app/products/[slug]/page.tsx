import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Star, ArrowLeft, Loader2, Shield, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  slug: string;
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
  origin: string;
  clarity: string;
  cut: string;
  color: string;
  ratings: {
    average: number;
    count: number;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products/slug/${params.slug}`);
    
    if (!response.ok) {
      return {
        title: 'Product Not Found | Nayab Gemstone',
        description: 'The requested product could not be found.',
      };
    }

    const product: Product = await response.json();

    return {
      title: `${product.name} - ${product.category.name} | Nayab Gemstone`,
      description: `${product.description.substring(0, 160)}... Premium ${product.category.name.toLowerCase()} from ${product.origin}. ${product.weight} carats, ${product.clarity} clarity.`,
      keywords: [
        product.name,
        product.category.name,
        product.origin,
        product.color,
        product.cut,
        'gemstone',
        'precious stone',
        'jewelry',
        'certified gemstone'
      ].join(', '),
      openGraph: {
        title: `${product.name} - Premium ${product.category.name}`,
        description: product.description,
        images: [
          {
            url: product.images[0],
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - Premium ${product.category.name}`,
        description: product.description,
        images: [product.images[0]],
      },
      alternates: {
        canonical: `/products/${product.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found | Nayab Gemstone',
      description: 'The requested product could not be found.',
    };
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string);
    }
  }, [params.slug]);

  const fetchProduct = async (slug: string) => {
    try {
      const response = await fetch(`/api/products/slug/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        stock: product.stock,
      });
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Nayab Gemstone',
    },
    category: product.category.name,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Nayab Gemstone',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratings.average,
      reviewCount: product.ratings.count,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: `${product.weight} carats`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Origin',
        value: product.origin,
      },
      {
        '@type': 'PropertyValue',
        name: 'Clarity',
        value: product.clarity,
      },
      {
        '@type': 'PropertyValue',
        name: 'Cut',
        value: product.cut,
      },
      {
        '@type': 'PropertyValue',
        name: 'Color',
        value: product.color,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600">
                      Featured
                    </Badge>
                  )}
                </div>
                
                {product.images.length > 1 && (
                  <div className="flex space-x-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                          selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {product.category.name}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.ratings.average)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="text-4xl font-bold text-blue-600 mb-6">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Gemstone Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Weight:</span>
                        <p className="font-semibold">{product.weight} carats</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Origin:</span>
                        <p className="font-semibold">{product.origin}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Clarity:</span>
                        <p className="font-semibold">{product.clarity}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Cut:</span>
                        <p className="font-semibold">{product.cut}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Color:</span>
                        <p className="font-semibold">{product.color}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Stock:</span>
                        <Badge variant={product.stock > 10 ? "secondary" : product.stock > 0 ? "default" : "destructive"}>
                          {product.stock} available
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    
                    <Button variant="outline" size="lg">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                    <div className="flex flex-col items-center space-y-2">
                      <Shield className="h-6 w-6 text-green-600" />
                      <span>Certified Authentic</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Truck className="h-6 w-6 text-blue-600" />
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <RotateCcw className="h-6 w-6 text-purple-600" />
                      <span>30-Day Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}