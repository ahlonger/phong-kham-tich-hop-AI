const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient()


// Tạo một người dùng mới
const createUser = async (data) => {
 return prisma.user.create({ data });
};

// Tìm người dùng theo email
const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

module.exports = {
 createUser,
 findUserByEmail
};
