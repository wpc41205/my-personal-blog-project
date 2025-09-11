import { BlogPost } from '../models/BlogPost.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/index.js';

/**
 * Get all blog posts with pagination and filtering
 * GET /api/posts?page=1&limit=6&category=highlight&keyword=search
 */
export const getAllPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 6,
    category,
    keyword
  } = req.query;

  // Build filter object
  const filter = {};
  if (category && category !== 'highlight') {
    filter.category = category;
  }
  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { content: { $regex: keyword, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const totalPosts = await BlogPost.countDocuments(filter);
  const totalPages = Math.ceil(totalPosts / parseInt(limit));

  // Get posts
  const posts = await BlogPost.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .select('-content'); // Exclude full content for list view

  res.json({
    posts,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalPosts,
      limit: parseInt(limit),
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1
    }
  });
});

/**
 * Get a single blog post by ID
 * GET /api/posts/:id
 */
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const post = await BlogPost.findById(id);
  
  if (!post) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.NOT_FOUND
    });
  }

  res.json({
    success: true,
    data: post
  });
});

/**
 * Search blog posts
 * GET /api/posts/search?q=searchterm&page=1&limit=6
 */
export const searchPosts = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 6 } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  const filter = {
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
      { tags: { $in: [new RegExp(q, 'i')] } }
    ]
  };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const totalPosts = await BlogPost.countDocuments(filter);
  const totalPages = Math.ceil(totalPosts / parseInt(limit));

  const posts = await BlogPost.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .select('-content');

  res.json({
    posts,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalPosts,
      limit: parseInt(limit),
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1
    },
    searchQuery: q
  });
});

/**
 * Create a new blog post
 * POST /api/posts
 */
export const createPost = asyncHandler(async (req, res) => {
  const postData = {
    ...req.body,
    author: req.user.id // From authentication middleware
  };

  const post = await BlogPost.create(postData);

  res.status(201).json({
    success: true,
    data: post
  });
});

/**
 * Update a blog post
 * PUT /api/posts/:id
 */
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const post = await BlogPost.findById(id);
  
  if (!post) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.NOT_FOUND
    });
  }

  // Check if user owns the post or is admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this post'
    });
  }

  const updatedPost = await BlogPost.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: updatedPost
  });
});

/**
 * Delete a blog post
 * DELETE /api/posts/:id
 */
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const post = await BlogPost.findById(id);
  
  if (!post) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.NOT_FOUND
    });
  }

  // Check if user owns the post or is admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this post'
    });
  }

  await BlogPost.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Post deleted successfully'
  });
});
