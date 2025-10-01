import React, { useState, useEffect, useCallback } from 'react';
import adminApi from '../../services/adminApi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

// Component debounce để tránh gọi API liên tục khi gõ tìm kiếm
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

export default function EmpBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State để lưu các giá trị lọc
    const [filters, setFilters] = useState({
        status: '',
        customerName: '',
        checkInDate: '',
    });

    const debouncedCustomerName = useDebounce(filters.customerName, 500); // Chờ 500ms sau khi ngừng gõ

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                status: filters.status || undefined,
                customerName: debouncedCustomerName || undefined,
                checkInDate: filters.checkInDate || undefined,
            };
            const response = await adminApi.getAllBookings(params);
            setBookings(response.data);
            setError(null);
        } catch (err) {
            setError('Không thể tải dữ liệu đặt phòng.');
            toast.error('Lỗi khi tải dữ liệu!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filters.status, debouncedCustomerName, filters.checkInDate]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateStatus = async (bookingId, newStatus) => {
        const actionText = newStatus === 'CheckedIn' ? 'Check-in' : 'Completed';
        
        const promise = adminApi.updateBookingStatus(bookingId, newStatus);
        
        toast.promise(promise, {
            loading: `Đang ${actionText}...`,
            success: `${actionText} thành công!`,
            error: `${actionText} thất bại!`,
        });

        try {
            await promise;
            // Cập nhật lại state local để giao diện thay đổi ngay lập tức
            setBookings(currentBookings => 
                currentBookings.map(booking => 
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );
        } catch (err) {
            // Toast đã tự xử lý thông báo lỗi
            console.error(`Lỗi khi ${actionText}:`, err);
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'CheckedIn': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-purple-100 text-purple-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 m-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Danh sách Đặt phòng</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg bg-gray-50">
                <input
                    type="text"
                    name="customerName"
                    value={filters.customerName}
                    onChange={handleFilterChange}
                    placeholder="Tìm theo tên khách hàng..."
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    name="checkInDate"
                    value={filters.checkInDate}
                    onChange={handleFilterChange}
                    className="p-2 border rounded-md text-gray-500 focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="CheckedIn">CheckedIn</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Mã ĐP</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Khách hàng</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Loại Phòng</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Check-in</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Check-out</th>
                            <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase">Tổng tiền</th>
                            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                            <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="8" className="text-center py-8 text-gray-500">Đang tải...</td></tr>
                        ) : error ? (
                             <tr><td colSpan="8" className="text-center py-8 text-red-500">{error}</td></tr>
                        ) : bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 font-mono text-sm text-gray-500">#{booking.id}</td>
                                <td className="py-3 px-4 whitespace-nowrap">{`${booking.customer.user.firstName} ${booking.customer.user.lastName}`}</td>
                                <td className="py-3 px-4 whitespace-nowrap">{booking.items[0]?.room.roomType.name || 'N/A'}</td>
                                <td className="py-3 px-4 whitespace-nowrap">{format(new Date(booking.checkInDate), 'dd/MM/yyyy')}</td>
                                <td className="py-3 px-4 whitespace-nowrap">{format(new Date(booking.checkOutDate), 'dd/MM/yyyy')}</td>
                                <td className="py-3 px-4 whitespace-nowrap text-right font-semibold text-gray-700">
                                    {new Intl.NumberFormat('vi-VN').format(booking.totalAmount)}đ
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                     {booking.status === 'Confirmed' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(booking.id, 'CheckedIn')} 
                                            className="text-blue-600 hover:text-blue-900 font-semibold"
                                        >
                                            Check-in
                                        </button>
                                    )}
                                    {booking.status === 'CheckedIn' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(booking.id, 'Completed')} 
                                            className="text-purple-600 hover:text-purple-900 font-semibold"
                                        >
                                            Check-out
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {bookings.length === 0 && !loading && !error && (
                    <p className="text-center py-8 text-gray-500">Không tìm thấy đơn đặt phòng nào khớp với điều kiện.</p>
                )}
            </div>
        </div>
    );
}