import React, { useState } from "react";
import bacsiImg from "../assets/bacsi.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BacSi from "../assets/phongkham.jpg";

const DanhSachBacSi = () => {
  const [selectedSpec, setSelectedSpec] = useState("Tất cả");

  const doctors = [
    { name: "BS. Phạm Hữu Thân Thương", spec: "Phụ Khoa", desc: "15 năm kinh nghiệm" },
    { name: "BS. Trần Thị B", spec: "Nha khoa", desc: "10 năm kinh nghiệm" },
    { name: "BS. Lê Văn C", spec: "Cấy ghép Implant", desc: "12 năm kinh nghiệm" },
    { name: "BS. Nguyễn Tấn Dũng", spec: "Tổng quát", desc: "12 năm kinh nghiệm" },
    { name: "BS. Phạm Minh Quân", spec: "Răng hàm mặt", desc: "9 năm kinh nghiệm" },
    { name: "BS. Lê Thanh Hà", spec: "Khám mắt", desc: "8 năm kinh nghiệm" },
    { name: "BS. Võ Hồ Thành Trung", spec: "Ngoại khoa", desc: "5 năm kinh nghiệm" },
    { name: "BS. Phạm Thị D", spec: "Nha khoa thẩm mỹ", desc: "14 năm kinh nghiệm" },
  ];

  const filteredDoctors =
    selectedSpec === "Tất cả"
      ? doctors
      : doctors.filter((d) => d.spec === selectedSpec);

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto p-4 md:p-10 mt-20 md:mt-28 text-center bg-gray-100 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0077cc] mb-8">
          Danh sách bác sĩ
        </h2>

        {/* Bộ lọc chuyên khoa */}
        <div className="mb-8">
          <select
            className="p-2 rounded border shadow"
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
          >
            <option value="Tất cả">Tất cả chuyên khoa</option>
            {[...new Set(doctors.map((d) => d.spec))].map((spec, i) => (
              <option key={i} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Danh sách bác sĩ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((bs, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow hover:-translate-y-1 transition"
            >
              <img
                src={BacSi}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                alt={bs.name}
              />
              <h3 className="font-semibold text-gray-800">{bs.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{bs.spec}</p>
              <p className="text-xs text-gray-500 italic mb-2">{bs.desc}</p>
              <button className="bg-[#0077cc] text-white px-4 py-2 rounded hover:bg-[#005fa3]">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </section>

          <Footer/>
     


    </>
  );
};

export default DanhSachBacSi;
