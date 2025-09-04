'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Home } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-4">
              You need admin privileges to access this page.
            </p>
            <Button onClick={() => router.push('/')} className="w-full">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <nav className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <Link href="/admin" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
          </div>
          
          <div className="px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start mb-1"
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
            
            <div className="mt-8 pt-4 border-t">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Home className="mr-3 h-4 w-4" />
                  Back to Store
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}