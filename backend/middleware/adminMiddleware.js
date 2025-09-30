export const verifyAdmin = (req, res, next) => {
    console.log('Verify Admin: req.user:', req.user);
    console.log('Verify Admin: req.user.role:', req.user?.role); 

    // Điều kiện kiểm tra role
    if (req.user && req.user.role === 'admin') { 
        console.log('Verify admin: User is admin (role), proceeding.'); 
        next(); 
    } else {
        console.log('Verify admin: Access forbidden. User role:', req.user?.role); 
        res.status(403).json({ message: 'Yêu cầu quyền admin.' });
    }
};