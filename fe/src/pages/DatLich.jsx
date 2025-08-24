import React, { useState } from "react";
import Navbar from "../components/Navbar";
import logodoitac from "../assets/logodoitac2.jpg";
import Api from "../components/Api";
import { useEffect } from "react";
const DatLich = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    doctor: "",
    note: "",
    datetime: "",
    agreed: false,
  });

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setForm((prevForm) => ({
      ...prevForm,
      email: storedUser.email || "",
    }));
  }
}, []);

  const handleSubmit = () => {
  const { name, email, phone, address, service, doctor,note, datetime, agreed } = form;

  if (!name || !email || !phone || !address || !service || !doctor || !datetime || !agreed) {
    alert("Vui lòng điền đầy đủ thông tin và đồng ý điều khoản!");
    return;
  }

  // Kiểm tra email có dạng hợp lệ (chứa @ và .)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
    return;
  }

  // Kiểm tra ngày giờ không được là quá khứ
  const now = new Date();
  const selectedDate = new Date(datetime);
  if (selectedDate < now) {
    alert("Thời gian đặt lịch không hợp lệ. Vui lòng chọn thời gian từ hiện tại trở đi.");
    return;
  }

  try {
    const data = {
      hoten: name,
      email: email,
      sdt: phone,
      diachi: address,
      dichvu: service,
      bacsi: doctor,
      ghichu: note,
      thoigianhen: datetime,
      dongy: agreed,
    };
    Api.post('booking',data) 
          .then(response=>{
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            alert("Đặt lịch thành công!");
              setForm({
              name: "",
              email: "",
              phone: "",
              address: "",
              service: "",
              doctor: "",
              note: "",
              datetime: "",
              agreed: false,
            });
          }
        })
  } catch (error) {
    console.error("❌ Lỗi khi gửi đặt lịch:", error);
    alert("Lỗi khi gửi đặt lịch, vui lòng thử lại.");
  }
};

  return (
    <>
      <Navbar />
      <div className="mt-8 flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] relative overflow-hidden">
        <img
          src={logodoitac}
          alt="bg bác sĩ"
          className="absolute bottom-0 right-0 opacity-10 w-[500px] hidden md:block pointer-events-none select-none"
        />

        <div className="flex w-[950px] h-[90vh] bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01] relative z-10">
          <div className="w-1/2 p-6 box-border">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in">ĐẶT LỊCH HẸN</h3>
            <p className="font-semibold text-gray-700 mb-3">THÔNG TIN BỆNH NHÂN</p>

            <label className="block mt-2 font-bold text-sm text-gray-600">Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập họ tên"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                 readOnly
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-1/2 p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-1/2 p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <label className="block font-bold text-sm text-gray-600">Địa chỉ</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />

            <p className="font-semibold text-gray-700 mt-3 mb-2">CHỌN DỊCH VỤ</p>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>Chọn dịch vụ</option>
              <option value="kham-tong-quat">Khám tổng quát</option>
              <option value="kham-chuyen-khoa">Khám chuyên khoa</option>
              <option value="xet-nghiem">Xét nghiệm</option>
            </select>
            <select
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>Chọn bác sĩ</option>
              <option value="bs-nguyen">BS. Nguyễn Văn A</option>
              <option value="bs-tran">BS. Trần Thị B</option>
            </select>
            <textarea
              placeholder="Thêm ghi chú"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none h-20"
            ></textarea>

            <p className="font-semibold text-gray-700 mt-3 mb-2">NGÀY VÀ GIỜ THÍCH HỢP</p>
            <input
              type="datetime-local"
              value={form.datetime}
              onChange={(e) => setForm({ ...form, datetime: e.target.value })}
              min={new Date().toISOString().slice(0, 16)} // giới hạn không được chọn thời gian quá khứ
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />

            <div className="flex items-center gap-2 my-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={form.agreed}
                onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span>Tôi xác nhận đã đọc và đồng ý với các điều khoản</span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              ĐẶT LỊCH
            </button>
          </div>

          <div
            className="w-1/2 bg-cover bg-center transform transition-all duration-500 hover:scale-105"
            style={{
              backgroundImage: "url('/src/assets/doctor.jpg')",
            }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>

    </>
  );
};

export default DatLich;
