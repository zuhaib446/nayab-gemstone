'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  search: string;
}

interface ProductFiltersProps {
  categories: Category[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function ProductFilters({ categories, filters, onFiltersChange }: ProductFiltersProps) {
  const updateFilter = (key: keyof Filters, value: string) => {
    // Handle "all" value as empty string for category filter
    const filterValue = key === 'category' && value === 'all' ? '' : value;
    onFiltersChange({ ...filters, [key]: filterValue });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gemstones..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={filters.category || 'all'} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            min="0"
          />

          <Input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            min="0"
          />
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={clearFilters} size="sm">
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}