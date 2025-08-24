import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaBoxOpen,
  FaFolderOpen,
  FaPen,
  FaTrash,
  FaPlus,
  FaHeartbeat,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const DichVuGoi = () => {
  const [goiDichVu, setGoiDichVu] = useState([
    {
      id: 1,
      ten: "Gói khám tổng quát",
      gia: 1200000,
      thoiHan: "6 tháng",
      trangThai: "Đang hoạt động",
      moTa:
        "Gói khám toàn diện bao gồm xét nghiệm máu, nước tiểu, siêu âm, đo điện tim, khám tổng thể các chuyên khoa.",
      hinhAnh: "/img/goi-kham-tong-quat.png",
    },
    {
      id: 2,
      ten: "Gói khám tim mạch",
      gia: 800000,
      thoiHan: "3 tháng",
      trangThai: "Ngừng cung cấp",
      moTa:
        "Gói chuyên khám các bệnh lý tim mạch: điện tim, siêu âm tim, tư vấn bác sĩ chuyên khoa.",
      hinhAnh: "/img/goi-kham-tim-mach.png",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ten: "",
    gia: "",
    thoiHan: "",
    trangThai: "Đang hoạt động",
    moTa: "",
    hinhAnh: "",
  });

  const openCreate = () => {
    setIsEditing(false);
    setFormData({
      ten: "",
      gia: "",
      thoiHan: "",
      trangThai: "Đang hoạt động",
      moTa: "",
      hinhAnh: "",
    });
    setIsOpen(true);
  };

  const openEdit = (goi) => {
    setIsEditing(true);
    setEditingId(goi.id);
    setFormData({
      ten: goi.ten,
      gia: goi.gia,
      thoiHan: goi.thoiHan,
      trangThai: goi.trangThai,
      moTa: goi.moTa,
      hinhAnh: goi.hinhAnh,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      ten: "",
      gia: "",
      thoiHan: "",
      trangThai: "Đang hoạt động",
      moTa: "",
      hinhAnh: "",
    });
  };

  const handleSave = () => {
    if (!formData.ten || !formData.gia) {
      alert("Vui lòng nhập đầy đủ Tên & Giá!");
      return;
    }
    if (isEditing) {
      setGoiDichVu((prev) =>
        prev.map((goi) =>
          goi.id === editingId
            ? { ...goi, ...formData, gia: Number(formData.gia) }
            : goi
        )
      );
    } else {
      const newGoi = {
        ...formData,
        id: Date.now(),
        gia: Number(formData.gia),
      };
      setGoiDichVu([newGoi, ...goiDichVu]);
    }
    handleClose();
  };

  const handleXoa = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xoá?")) {
      setGoiDichVu(goiDichVu.filter((goi) => goi.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 pl-72">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <FaBoxOpen /> Quản lý dịch vụ gói
          </h1>
          <button
            onClick={openCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow"
          >
            <FaPlus /> Tạo gói mới
          </button>
        </div>

        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <FaFolderOpen /> Danh sách dịch vụ gói
        </h2>

        <div className="space-y-4">
          {goiDichVu.map((goi) => (
            <div
              key={goi.id}
              className="flex flex-col md:flex-row md:items-start bg-white p-4 rounded-xl shadow-md justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={goi.hinhAnh || "/img/default.png"}
                  alt={goi.ten}
                  className="w-28 h-28 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    <FaHeartbeat className="text-pink-600" />
                    {goi.ten}
                  </h3>
                  <p className="text-gray-600 mt-1 flex items-center gap-2 flex-wrap">
                    <FaMoneyBillWave className="text-green-600" />
                    <span className="font-semibold text-black">
                      {goi.gia.toLocaleString("vi-VN")}₫
                    </span>
                    • <FaRegCalendarAlt /> {goi.thoiHan}
                    <span
                      className={`ml-2 px-2 py-0.5 text-sm rounded-full ${
                        goi.trangThai === "Đang hoạt động"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {goi.trangThai}
                    </span>
                  </p>
                  <p className="text-gray-700 mt-1">{goi.moTa}</p>
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2">
                <button
                  onClick={() => openEdit(goi)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaPen /> Cập nhật
                </button>
                <button
                  onClick={() => handleXoa(goi.id)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaTrash /> Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Tạo + Sửa */}
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-lg font-bold text-blue-800">
                {isEditing ? "Cập nhật gói dịch vụ" : "Tạo gói dịch vụ"}
              </Dialog.Title>
              <button onClick={handleClose}>
                <FaTimes className="text-gray-500 hover:text-red-500" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Tên gói"
              className="w-full border px-3 py-2 rounded"
              value={formData.ten}
              onChange={(e) =>
                setFormData({ ...formData, ten: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Giá (VND)"
              className="w-full border px-3 py-2 rounded"
              value={formData.gia}
              onChange={(e) =>
                setFormData({ ...formData, gia: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Thời hạn (VD: 3 tháng)"
              className="w-full border px-3 py-2 rounded"
              value={formData.thoiHan}
              onChange={(e) =>
                setFormData({ ...formData, thoiHan: e.target.value })
              }
            />
            <textarea
              placeholder="Mô tả gói dịch vụ"
              className="w-full border px-3 py-2 rounded"
              value={formData.moTa}
              onChange={(e) =>
                setFormData({ ...formData, moTa: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Link ảnh minh hoạ (nếu có)"
              className="w-full border px-3 py-2 rounded"
              value={formData.hinhAnh}
              onChange={(e) =>
                setFormData({ ...formData, hinhAnh: e.target.value })
              }
            />
            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Lưu thay đổi" : "Tạo mới"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default DichVuGoi;
