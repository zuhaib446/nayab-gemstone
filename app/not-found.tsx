'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur text-center">
          <CardContent className="pt-12 pb-8">
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-16 w-16 text-blue-600" />
            </div>
            
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Gemstone Not Found
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The precious gemstone you're looking for seems to have vanished into the depths of our collection. 
                Let's help you find your way back to our treasure trove.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                  </Button>
                </Link>
                
                <Link href="/products">
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Collection
                  </Button>
                </Link>
              </div>

              <div className="pt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => window.history.back()}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </motion.div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@nayabgemstone.com" className="text-blue-600 hover:underline">
                  support@nayabgemstone.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}