import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";

const LichDaDangKy = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const schedules = [
    {
      ngay: "05/07/2025",
      gioBatDau: "09:00",
      gioKetThuc: "12:00",
      phongKham: "Phòng 201",
      trangThai: "Đã xác nhận",
    },
    {
      ngay: "03/07/2025",
      gioBatDau: "14:00",
      gioKetThuc: "17:00",
      phongKham: "Phòng 202",
      trangThai: "Đã xác nhận",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 mt-16">
      <Navbar2 isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } p-6`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-500 font-bold">📅</span>
            </div>
            <h1 className="text-xl font-bold text-blue-600">Lịch đã đăng ký</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Phòng khám đa khoa</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500">👤</span>
            </div>
            <span className="text-sm text-gray-600">Bác sĩ</span>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Danh sách lịch đã đăng ký
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-gray-300 text-gray-700">
                  <th className="py-3 px-4 font-semibold">Ngày</th>
                  <th className="py-3 px-4 font-semibold">Giờ bắt đầu</th>
                  <th className="py-3 px-4 font-semibold">Giờ kết thúc</th>
                  <th className="py-3 px-4 font-semibold">Phòng khám</th>
                  <th className="py-3 px-4 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{schedule.ngay}</td>
                    <td className="py-3 px-4">{schedule.gioBatDau}</td>
                    <td className="py-3 px-4">{schedule.gioKetThuc}</td>
                    <td className="py-3 px-4">{schedule.phongKham}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-200 text-blue-800">
                        {schedule.trangThai}
                      </span>
                    </td>
                  </tr>
                ))}
                {schedules.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center px-4 py-6 text-gray-500"
                    >
                      Không có lịch nào được đăng ký.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LichDaDangKy;
