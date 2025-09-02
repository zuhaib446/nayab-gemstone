import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: mongoose.Types.ObjectId;
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
  reviews: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  images: [{
    type: String,
    required: true,
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0, 'Weight cannot be negative'],
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
  },
  clarity: {
    type: String,
    required: [true, 'Clarity is required'],
  },
  cut: {
    type: String,
    required: [true, 'Cut is required'],
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, {
  timestamps: true,
});

ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ featured: 1 });

// Delete the model if it exists to avoid OverwriteModelError
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;