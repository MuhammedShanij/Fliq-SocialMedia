import express from 'express';
import { loginAdmin , getAllUsers ,blockManagement, getAllPosts, getAllReportedPost} from '../controllers/AdminController.js';
import authMiddleWare from '../middleware/AdminMiddleware.js';

const router = express.Router()

router.post('/login', loginAdmin);
router.get('/users',authMiddleWare, getAllUsers);
router.put('/users/block',authMiddleWare,blockManagement);
router.get('/posts',authMiddleWare, getAllPosts);
router.get('/postsReport', getAllReportedPost);

export default router