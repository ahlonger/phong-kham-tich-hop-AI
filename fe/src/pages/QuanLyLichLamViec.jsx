import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const QuanLyLichLamViec = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    ngay: "",
    gioBatDau: "",
    gioKetThuc: "",
    phongKham: "",
    trangThai: "Đang chờ!",
  });
  const [editSchedule, setEditSchedule] = useState(null);
  const [schedules, setSchedules] = useState([
    {
      ngay: "26/06/2025",
      gioBatDau: "08:00",
      gioKetThuc: "11:30",
      phongKham: "Phòng 203",
      trangThai: "Chờ!",
    },
    {
      ngay: "27/06/2025",
      gioBatDau: "13:00",
      gioKetThuc: "16:30",
      phongKham: "Phòng 204",
      trangThai: "Chờ!",
    },
  ]);

  const handleCreate = () => {
    setSchedules([newSchedule, ...schedules]);
    setNewSchedule({
      ngay: "",
      gioBatDau: "",
      gioKetThuc: "",
      phongKham: "",
      trangThai: "Chờ!",
    });
    setIsCreateOpen(false);
  };

  const handleEdit = (schedule) => {
    setEditSchedule({ ...schedule });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setSchedules(
      schedules.map((item) =>
        item.ngay === editSchedule.ngay &&
        item.gioBatDau === editSchedule.gioBatDau &&
        item.gioKetThuc === editSchedule.gioKetThuc &&
        item.phongKham === editSchedule.phongKham
          ? editSchedule
          : item
      )
    );
    setIsEditOpen(false);
    setEditSchedule(null);
  };

  const handleDelete = (schedule) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch này?")) {
      setSchedules(schedules.filter((item) => item !== schedule));
    }
  };

  return (
    <div className="flex min-h-screen mt-16 bg-gray-100">
      <Navbar2 isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Nội dung chính */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } p-6`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <span>🗓️</span> Quản lý lịch làm việc
          </h1>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaPlus /> Tạo lịch mới
          </button>
        </div>

        {/* Danh sách */}
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4">Ngày</th>
                <th className="py-3 px-4">Giờ bắt đầu</th>
                <th className="py-3 px-4">Giờ kết thúc</th>
                <th className="py-3 px-4">Phòng khám</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="py-3 px-4">{schedule.ngay}</td>
                  <td className="py-3 px-4">{schedule.gioBatDau}</td>
                  <td className="py-3 px-4">{schedule.gioKetThuc}</td>
                  <td className="py-3 px-4">{schedule.phongKham}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        schedule.trangThai === "Chưa có đăng ký"
                          ? "bg-green-200 text-green-800"
                          : schedule.trangThai === "Đang chờ xác nhận"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {schedule.trangThai}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 flex items-center gap-1"
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(schedule)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaTrash /> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Tạo */}
      <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-lg font-bold text-blue-700 mb-2">
              Tạo lịch làm việc mới
            </Dialog.Title>
            <input
              type="text"
              placeholder="Ngày"
              className="w-full border px-3 py-2 rounded"
              value={newSchedule.ngay}
              onChange={(e) => setNewSchedule({ ...newSchedule, ngay: e.target.value })}
            />
            <input
              type="text"
              placeholder="Giờ bắt đầu"
              className="w-full border px-3 py-2 rounded"
              value={newSchedule.gioBatDau}
              onChange={(e) => setNewSchedule({ ...newSchedule, gioBatDau: e.target.value })}
            />
            <input
              type="text"
              placeholder="Giờ kết thúc"
              className="w-full border px-3 py-2 rounded"
              value={newSchedule.gioKetThuc}
              onChange={(e) => setNewSchedule({ ...newSchedule, gioKetThuc: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phòng khám"
              className="w-full border px-3 py-2 rounded"
              value={newSchedule.phongKham}
              onChange={(e) => setNewSchedule({ ...newSchedule, phongKham: e.target.value })}
            />
            <div className="text-right">
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Tạo mới
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal Sửa */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-lg font-bold text-blue-700 mb-2">
              Chỉnh sửa lịch làm việc
            </Dialog.Title>
            {editSchedule && (
              <>
                <input
                  type="text"
                  placeholder="Ngày"
                  className="w-full border px-3 py-2 rounded"
                  value={editSchedule.ngay}
                  onChange={(e) => setEditSchedule({ ...editSchedule, ngay: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Giờ bắt đầu"
                  className="w-full border px-3 py-2 rounded"
                  value={editSchedule.gioBatDau}
                  onChange={(e) => setEditSchedule({ ...editSchedule, gioBatDau: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Giờ kết thúc"
                  className="w-full border px-3 py-2 rounded"
                  value={editSchedule.gioKetThuc}
                  onChange={(e) => setEditSchedule({ ...editSchedule, gioKetThuc: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phòng khám"
                  className="w-full border px-3 py-2 rounded"
                  value={editSchedule.phongKham}
                  onChange={(e) => setEditSchedule({ ...editSchedule, phongKham: e.target.value })}
                />
                <div className="text-right">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Lưu
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default QuanLyLichLamViec;
