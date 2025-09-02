import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  image: string;
  slug: string;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
  },
  image: {
    type: String,
    required: [true, 'Category image is required'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
}, {
  timestamps: true,
});

CategorySchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// Delete the model if it exists to avoid OverwriteModelError
if (mongoose.models.Category) {
  delete mongoose.models.Category;
}

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;