import express from 'express';

import { getPost, getPosts, createPosts, getPostsBySearch, updatePosts, deletePosts, likePosts, commentPost } from '../controllers/posts.controllers.js';
import auth from '../middleware/auth.js';

// Routes with :id need to be placed after routes with no :id in them
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePosts);
router.delete('/:id', auth, deletePosts);
router.patch('/:id/likePost', auth, likePosts);
router.post('/:id/commentPost', auth, commentPost);

export default router;