// src/pages/LichHen.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaCalendarAlt, FaFileExport, FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Api from "../components/Api";
import dayjs from "dayjs";
const LichHen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lichHenData, setLichHenData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  Lấy dữ liệu lịch hẹn từ API khi load component
  useEffect(() => {
    Api.get("booking")
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item.id,
          benhNhan: item.hoten || "Chưa rõ",
          bacSi: item.bacsi || "BS. Chưa rõ",
          thoiGian: item.thoigianhen
          ? dayjs(item.thoigianhen).format("HH:mm DD/MM/YYYY")
          : "Không rõ",

          dichVu: item.dichvu || "Chưa rõ",
          trangThai: item.trangthai || "Đang chờ",
        }));
        setLichHenData(data);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách lịch hẹn:", err);
      });
  }, []);

  const filteredData = lichHenData.filter(
    (item) =>
      item.benhNhan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bacSi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dichVu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      lichHenData.map((item) => ({
        "Bệnh nhân": item.benhNhan,
        "Bác sĩ": item.bacSi,
        "Thời gian": item.thoiGian,
        "Dịch vụ": item.dichVu,
        "Trạng thái": item.trangThai,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LichHen");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "lich_hen.xlsx");
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
      setLichHenData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, trangThai: "Đã huỷ" } : item
        )
      );
    }
  };

  const handleConfirmAppointment = (id) => {
    setLichHenData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, trangThai: "Đã xác nhận" } : item
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 md:pl-72">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaCalendarAlt /> Quản lý lịch hẹn
          </h1>
          <button
            onClick={handleExportReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
          >
            <FaFileExport /> Xuất Excel
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Tìm kiếm bệnh nhân, bác sĩ, dịch vụ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="py-3 px-4 font-semibold">Bệnh nhân</th>
                  <th className="py-3 px-4 font-semibold">Bác sĩ</th>
                  <th className="py-3 px-4 font-semibold">Thời gian</th>
                  <th className="py-3 px-4 font-semibold">Dịch vụ</th>
                  <th className="py-3 px-4 font-semibold">Trạng thái</th>
                  <th className="py-3 px-4 font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50 rounded-lg">
                    <td className="py-3 px-4">{item.benhNhan}</td>
                    <td className="py-3 px-4">{item.bacSi}</td>
                    <td className="py-3 px-4">{item.thoiGian}</td>
                    <td className="py-3 px-4">{item.dichVu}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          item.trangThai === "Đã xác nhận"
                            ? "bg-green-100 text-green-800"
                            : item.trangThai === "Đang chờ"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.trangThai}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetail(item)}
                        className="text-blue-600 hover:text-blue-800 mr-2 text-sm"
                      >
                        Chi tiết
                      </button>
                      {item.trangThai !== "Đã huỷ" && (
                        <button
                          onClick={() => handleCancelAppointment(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Hủy
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredData.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                Không có lịch hẹn nào phù hợp.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Chi tiết lịch hẹn</h2>
            <p><strong>Bệnh nhân:</strong> {selectedItem.benhNhan}</p>
            <p><strong>Bác sĩ:</strong> {selectedItem.bacSi}</p>
            <p><strong>Thời gian:</strong> {selectedItem.thoiGian}</p>
            <p><strong>Dịch vụ:</strong> {selectedItem.dichVu}</p>
            <p><strong>Trạng thái:</strong> {selectedItem.trangThai}</p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Đóng
              </button>

              {selectedItem.trangThai === "Đang chờ" && (
                <button
                  onClick={() => handleConfirmAppointment(selectedItem.id)}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LichHen;
