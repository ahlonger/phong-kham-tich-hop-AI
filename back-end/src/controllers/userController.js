const userModel = require('../models/userModel');
const validateUser = require('../validation/userValidation');
const multer = require('multer');
const path = require('path'); 
// Tạo một người dùng mới 

// Thiết lập Multer để xử lý tệp hình ảnh
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, 'public/uploads/user'); // Thư mục lưu trữ tệp hình ảnh (phải tạo sẵn)
 },
 filename: (req, file, cb) => {
   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
   cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
 },
});

// const upload = multer({ storage });
const upload = multer({ storage }).single('avatar');


const createUser = async (req, res) => {
 const data = req.body;
 //xử lý ảnh
 const avatarFile = req.file;
 const errors = validateUser(data, avatarFile);

 if (Object.keys(errors).length > 0) {
   return res.status(400).json(errors);
 }

  data.avatar = req.file ? req.file.path : ''; // Đường dẫn tới tệp hình ảnh (nếu có)
 const user = await userModel.createUser(data);
 res.json(user)
}

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
  }

  res.json({ message: "Đăng nhập thành công", user });
};

module.exports = {
 createUser,
 loginUser,
 upload
}
