const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient()

//tạo đặt lịch
const createBooking = async (data) => {
  return await prisma.booking.create({ data });
};

// ✅ Lấy tất cả lịch hẹn
const getAllBookings = async () => {
  return await prisma.booking.findMany({
    orderBy: { thoigianhen: "desc" }
  });
};

module.exports = {
  createBooking,
  getAllBookings
};
