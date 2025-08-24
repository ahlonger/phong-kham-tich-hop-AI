// src/pages/ThanhToan.jsx
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const ThanhToan = ({ isOpen, onClose, service }) => {
  const [paymentMethod, setPaymentMethod] = useState("atm");

  const handlePayment = () => {
    alert(`Thanh toán thành công cho gói ${service?.title} bằng ${paymentMethod === "cash" ? "Tiền mặt tại cơ sở" : paymentMethod === "credit" ? "Thẻ tín dụng" : paymentMethod === "ewallet" ? "Ví điện tử" : "Thẻ ATM"}!`);
    onClose();
  };

  // Danh sách bác sĩ mẫu (lấy từ BenhNhan.jsx)
  const doctors = [
    "BS. Nguyễn Văn A",
    "BS. Trần Thị B",
    "BS. Lê Văn C",
    "BS. Phạm Thị D",
  ];
  const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
  const invoiceCode = `INV-20250705-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  // Tính ngày khám: 5 ngày sau ngày hiện tại
  const purchaseDate = new Date();
  const examDate = new Date(purchaseDate);
  examDate.setDate(purchaseDate.getDate() + 5);
  const formattedExamDate = examDate.toLocaleDateString("vi-VN");

  if (!service) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <Dialog.Title className="text-2xl font-bold text-[#0077cc]">
              Thanh toán gói dịch vụ
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Thông tin hóa đơn */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Thông tin hóa đơn</h3>
              <div className="mt-2 text-left space-y-2">
                <p><span className="font-medium">Mã hóa đơn:</span> {invoiceCode}</p>
                <p><span className="font-medium">Bác sĩ khám:</span> {randomDoctor}</p>
                <p><span className="font-medium">Ngày khám:</span> {formattedExamDate}</p>
                <p><span className="font-medium">Tên gói dịch vụ:</span> {service.title}</p>
                <p><span className="font-medium">Giá:</span> <span className="text-[#e74c3c]">{service.price}</span></p>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="border-t pt-4">
              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Phương thức thanh toán
              </h4>
              <div className="space-y-2">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077cc]"
                >
                  <option value="atm">Thẻ ATM</option>
                  <option value="credit">Thẻ tín dụng</option>
                  <option value="ewallet">Ví điện tử</option>
                  <option value="cash">Tiền mặt tại cơ sở</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Hủy
            </button>
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-[#0077cc] text-white rounded-lg hover:bg-[#005fa3] transition"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ThanhToan;