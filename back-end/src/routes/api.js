const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController')

// Định nghĩa các tuyến đường API ở đây

//User
// user đăng ký
router.post('/register',userController.upload,userController.createUser)

// user đăng nhập
router.post('/login', userController.loginUser);

//Booking
// đặt lịch
router.post('/booking', bookingController.createBooking);
// GET danh sách lịch hẹn
router.get('/booking', bookingController.getAllBookings);

module.exports = router;
