import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
import { FaSearch, FaFolderOpen } from "react-icons/fa";

const DichVu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Khám dạ dày",
      email: "abc@gmail.com",
      date: "26/06/2025",
      amount: "300000",
      status: "Đã thanh toán",
    },
    {
      id: 2,
      name: "Khám tổng quát",
      email: "xyz@gmail.com",
      date: "27/06/2025",
      amount: "500000",
      status: "Đang chờ",
    },
    {
      id: 3,
      name: "Làm trắng răng",
      email: "bacsi@gmail.com",
      date: "28/06/2025",
      amount: "1200000",
      status: "Đã thanh toán",
    },
  ]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmPayment = (id) => {
    if (window.confirm("Xác nhận đã thanh toán dịch vụ này?")) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: "Đã thanh toán" } : s
        )
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-16 min-h-screen">
      <Navbar2
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        } p-4 md:p-8 bg-gray-50`}
      >
        {/* Tiêu đề & tìm kiếm */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <FaFolderOpen /> Quản lý dịch vụ
          </h1>

          <div className="flex items-center border rounded px-3 py-2 bg-white shadow-sm w-full md:w-auto">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              className="outline-none flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Bảng dịch vụ */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <div className="flex items-center bg-blue-100 px-4 py-2 font-bold">
            <FaFolderOpen className="mr-2 text-blue-600" />
            Danh sách dịch vụ
          </div>
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-3 font-medium">Tên dịch vụ</th>
                <th className="px-4 py-3 font-medium">Email bệnh nhân</th>
                <th className="px-4 py-3 font-medium">Ngày</th>
                <th className="px-4 py-3 font-medium">Thành tiền</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">{s.date}</td>
                  <td className="px-4 py-3">{s.amount} vnđ</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        s.status === "Đã thanh toán"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {s.status === "Đang chờ" && (
                      <button
                        onClick={() => handleConfirmPayment(s.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Xác nhận
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                    Không tìm thấy dịch vụ phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DichVu;
