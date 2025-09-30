import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { verifyAdmin } from '../middleware/adminMiddleware.js';
import { getAllUsers, getAllCustomers, updateUser } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getAllUsers);
router.get('/customers', verifyToken, verifyAdmin, getAllCustomers);
router.put('/users/:id', updateUser);

export default router;