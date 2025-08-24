const bookingModel = require('../models/bookingModel');
const validateBooking = require('../validation/bookingValidation');

// Đặt lịch hẹn
const createBooking = async (req, res) => {
  const data = req.body;

  const errors = validateBooking(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    // Chuyển đổi thời gian hẹn
    data.thoigianhen = new Date(data.thoigianhen);

    const booking = await bookingModel.createBooking(data);
    res.status(201).json({ message: 'Đặt lịch thành công', booking });
  } catch (error) {
    console.error('Lỗi đặt lịch:', error);
    res.status(500).json({ message: 'Lỗi server khi đặt lịch' });
  }
};

//  Lấy danh sách lịch hẹn
const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách lịch hẹn:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy lịch hẹn' });
  }
};

module.exports = {
  createBooking,
  getAllBookings
};
