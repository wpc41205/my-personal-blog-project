import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['highlight', 'General', 'Cat', 'Inspiration'],
      message: 'Category must be one of: highlight, General, Cat, Inspiration'
    },
    default: 'General'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
blogPostSchema.index({ title: 'text', description: 'text', content: 'text' });
blogPostSchema.index({ category: 1, publishedAt: -1 });
blogPostSchema.index({ author: 1, publishedAt: -1 });
blogPostSchema.index({ isPublished: 1, publishedAt: -1 });

// Virtual for formatted date
blogPostSchema.virtual('formattedDate').get(function() {
  return this.publishedAt.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});

// Pre-save middleware to update updatedAt
blogPostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to get posts by category
blogPostSchema.statics.getByCategory = function(category, page = 1, limit = 6) {
  const skip = (page - 1) * limit;
  return this.find({ category, isPublished: true })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'name email');
};

// Instance method to increment views
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to toggle like
blogPostSchema.methods.toggleLike = function() {
  this.likes += 1;
  return this.save();
};

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
