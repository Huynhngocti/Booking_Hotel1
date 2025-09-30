import Customer from '../models/Customer.js';
import User from '../models/User.js';

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Luôn loại bỏ mật khẩu
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng.' });
    }
};

// Lấy danh sách khách hàng kèm thông tin chi tiết
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            include: [{
                model: User,
                as: 'user',
                where: {
                    role: 'Customer' 
                },
                required: true
            }],
            // SỬA LẠI DÒNG DƯỚI ĐÂY
            order: [
                [{ model: User, as: 'user' }, 'created_at', 'DESC']
            ]
        });
        res.status(200).json(customers);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Đây là userId
        // Lấy các trường có thể được cập nhật từ body
        const { firstName, lastName, phone, status } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        // Tạo một object chứa các dữ liệu cần cập nhật
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (firstName || lastName) {
            updateData.fullName = `${firstName || user.firstName} ${lastName || user.lastName}`.trim();
        }
        if (phone) updateData.phone = phone;
        if (status) updateData.status = status; // Dùng để Vô hiệu hóa / Kích hoạt

        // Cập nhật các trường có trong updateData
        await user.update(updateData);
        
        // Trả về user đã được cập nhật (loại bỏ password)
        const { password, ...userWithoutPassword } = user.get({ plain: true });
        res.status(200).json(userWithoutPassword);

    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        res.status(500).json({ message: "Lỗi server khi cập nhật" });
    }
};