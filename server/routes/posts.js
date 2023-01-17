import express from 'express'
//import { commentPost } from '../../client/src/actions/posts.js'

import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost) //I can use patch for update because its updating
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost) //I can use patch for like because its updating
router.post('/:id/commentPost', commentPost);

export default router