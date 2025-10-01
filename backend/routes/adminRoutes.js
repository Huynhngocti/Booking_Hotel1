import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { verifyAdmin, verifyEmployee } from '../middleware/adminMiddleware.js';
import { getAllUsers, getAllCustomers, updateUser, getAllBookingsAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getAllUsers);
router.get('/customers', verifyToken, verifyAdmin, getAllCustomers);
router.put('/users/:id', verifyToken, verifyAdmin, updateUser);

router.get('/bookings', verifyToken, verifyEmployee, getAllBookingsAdmin);

export default router;