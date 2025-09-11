import express from 'express';
import { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost,
  searchPosts 
} from '../controllers/blogController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validatePost } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPostById);

// Protected routes (require authentication)
router.post('/', authenticateToken, validatePost, createPost);
router.put('/:id', authenticateToken, validatePost, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;
