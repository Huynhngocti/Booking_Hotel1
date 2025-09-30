import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';

// Import các models
import User from './models/User.js';
import Customer from './models/Customer.js';
import Booking from './models/Booking.js';
import BookingItem from './models/BookingItem.js';
import Room from './models/Room.js';
import RoomType from './models/RoomType.js';
import Review from './models/Review.js';

//Import các routes
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js'; 
import roomTypeRoutes from './routes/roomTypeRoutes.js'; 
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from './routes/adminRoutes.js';
import supportRoutes from "./routes/supportRoutes.js";
import SupportTicket from './models/SupportTicket.js';
import SupportMessage from './models/SupportMessage.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Cho phép server truy cập vào các file trong thư mục 'public'
// Ví dụ: ảnh lưu ở 'public/images/room.jpg' có thể được truy cập qua URL '/images/room.jpg'
app.use(express.static('public'));

// Gắn các routes vào app
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes); 
app.use('/api/room-types', roomTypeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/users", userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/support', supportRoutes);

const PORT = process.env.PORT || 5000;

// User <-> Customer (Một-Một)
User.hasOne(Customer, { foreignKey: 'userId', as: 'customer' });
Customer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Customer <-> Booking (Một-Nhiều)
Customer.hasMany(Booking, { foreignKey: 'customerId', as: 'bookings' });
Booking.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Booking <-> BookingItem (Một-Nhiều)
Booking.hasMany(BookingItem, { foreignKey: 'bookingId', as: 'items' });
BookingItem.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

// Room <-> Review (1-1)
Booking.hasOne(Review, { foreignKey: 'bookingId', as: 'review' });
Review.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

// Room <-> BookingItem (Một-Nhiều)
Room.hasMany(BookingItem, { foreignKey: 'roomId', as: 'bookingItems' });
BookingItem.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

// RoomType <-> Room (Một-Nhiều)
RoomType.hasMany(Room, { foreignKey: 'roomTypeId', as: 'rooms' });
Room.belongsTo(RoomType, { foreignKey: 'roomTypeId', as: 'roomType' });



// sequelize.sync() // Dùng sync thay vì alter để an toàn hơn
//     .then(() => {
//         console.log("Cơ sở dữ liệu đã được đồng bộ hóa.");
//         app.listen(PORT, () => console.log(`Server đang chạy ở cổng ${PORT}`));
//     })
//     .catch(err => {
//         console.error('Không thể kết nối đến database:', err);
//     });

// Luôn khởi động server mà không cần đồng bộ hóa
app.listen(PORT, () => console.log(`Server đang chạy ở cổng ${PORT}`));