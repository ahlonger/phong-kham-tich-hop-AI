import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";

const ThongTinCaNhan = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Navbar2
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Nội dung chính */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } p-6`}
      >
        <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Quản Lý Thông Tin Bác Sĩ
        </h1>

        <div className="bg-white shadow p-6 rounded-lg max-w-2xl mx-auto">
          {/* Ảnh đại diện */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-40 h-40 rounded-full overflow-hidden border shadow">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <label className="mt-4 cursor-pointer text-sm font-medium text-blue-600 hover:underline">
              Chọn ảnh đại diện
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Form đầy đủ */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Họ tên</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Nhập họ tên"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                placeholder="Nhập email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Số điện thoại</label>
              <input
                type="tel"
                className="w-full border rounded px-3 py-2"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Giới tính</label>
              <select className="w-full border rounded px-3 py-2">
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Phòng ban</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="VD: Khoa Răng Hàm Mặt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Chuyên khoa</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="VD: Chỉnh nha, Phẫu thuật răng miệng..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Trình độ chuyên môn</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="VD: Bác sĩ chuyên khoa I, II..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Kinh nghiệm làm việc</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="VD: 5 năm kinh nghiệm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Giới thiệu bản thân</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows="4"
                placeholder="Mô tả chi tiết về bản thân, thành tích, triết lý nghề nghiệp..."
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Lưu Thay Đổi
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ThongTinCaNhan;
