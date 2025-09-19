import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bacsiImg from "../assets/bacsi.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BacSi from "../assets/phongkham.jpg";
import bannerImgbacsi from "../assets/bannerbacsi.jpg";

const DanhSachBacSi = () => {
  const [selectedSpec, setSelectedSpec] = useState("Tất cả");
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State để lưu bác sĩ được chọn
  const navigate = useNavigate();

  const doctors = [
    { 
      id: 1, 
      name: "BS. Phạm Hữu Thân Thương", 
      spec: "Phụ Khoa", 
      desc: "15 năm kinh nghiệm",
      position: "Chủ nhiệm khoa Phụ Khoa",
      experience: 15,
      introduction: "Bác sĩ Phạm Hữu Thân Thương có hơn 15 năm kinh nghiệm trong lĩnh vực phụ khoa, chuyên điều trị các bệnh lý phức tạp.",
      achievements: "Giải thưởng Bác sĩ xuất sắc năm 2023.",
      image: BacSi
    },
    { 
      id: 2, 
      name: "BS. Trần Thị B", 
      spec: "Nha khoa", 
      desc: "10 năm kinh nghiệm",
      position: "Phó khoa Nha khoa",
      experience: 10,
      introduction: "Bác sĩ Trần Thị B chuyên sâu về các vấn đề nha khoa cơ bản và thẩm mỹ.",
      achievements: "Chứng nhận chuyên gia nha khoa quốc tế 2022.",
      image: BacSi
    },
    { 
      id: 3, 
      name: "BS. Lê Văn C", 
      spec: "Cấy ghép Implant", 
      desc: "12 năm kinh nghiệm",
      position: "Trưởng khoa Cấy ghép",
      experience: 12,
      introduction: "Bác sĩ Lê Văn C nổi tiếng với kỹ thuật cấy ghép Implant tiên tiến.",
      achievements: "Giải thưởng Implant xuất sắc 2021.",
      image: BacSi
    },
    { 
      id: 4, 
      name: "BS. Nguyễn Tấn Dũng", 
      spec: "Tổng quát", 
      desc: "12 năm kinh nghiệm",
      position: "Chuyên viên tổng quát",
      experience: 12,
      introduction: "Bác sĩ Nguyễn Tấn Dũng có kinh nghiệm trong khám tổng quát và chẩn đoán ban đầu.",
      achievements: "Chứng nhận bác sĩ tổng quát 2020.",
      image: BacSi
    },
    { 
      id: 5, 
      name: "BS. Phạm Minh Quân", 
      spec: "Răng hàm mặt", 
      desc: "9 năm kinh nghiệm",
      position: "Chuyên viên Răng hàm mặt",
      experience: 9,
      introduction: "Bác sĩ Phạm Minh Quân chuyên về các bệnh lý răng hàm phức tạp.",
      achievements: "Giải thưởng nghiên cứu răng hàm mặt 2019.",
      image: BacSi
    },
    { 
      id: 6, 
      name: "BS. Lê Thanh Hà", 
      spec: "Khám mắt", 
      desc: "8 năm kinh nghiệm",
      position: "Chuyên viên Khám mắt",
      experience: 8,
      introduction: "Bác sĩ Lê Thanh Hà có kinh nghiệm trong kiểm tra và điều trị mắt.",
      achievements: "Chứng nhận chuyên gia mắt 2021.",
      image: BacSi
    },
    { 
      id: 7, 
      name: "BS. Võ Hồ Thành Trung", 
      spec: "Ngoại khoa", 
      desc: "5 năm kinh nghiệm",
      position: "Chuyên viên Ngoại khoa",
      experience: 5,
      introduction: "Bác sĩ Võ Hồ Thành Trung chuyên về phẫu thuật ngoại khoa cơ bản.",
      achievements: "Chứng nhận ngoại khoa 2023.",
      image: BacSi
    },
    { 
      id: 8, 
      name: "BS. Phạm Thị D", 
      spec: "Nha khoa thẩm mỹ", 
      desc: "14 năm kinh nghiệm",
      position: "Chuyên viên Thẩm mỹ nha khoa",
      experience: 14,
      introduction: "Bác sĩ Phạm Thị D chuyên về làm trắng răng và chỉnh nha thẩm mỹ.",
      achievements: "Giải thưởng thẩm mỹ nha khoa 2022.",
      image: BacSi
    },
  ];

  const filteredDoctors =
    selectedSpec === "Tất cả"
      ? doctors
      : doctors.filter((d) => d.spec === selectedSpec);

  const handleViewDoctorDetail = (doctor) => {
    setSelectedDoctor(doctor); // Hiển thị chi tiết khi click
  };

  const closeDetail = () => {
    setSelectedDoctor(null); // Đóng chi tiết khi click ra ngoài
  };

  return (
    <>
      <Navbar />
      <img src={bannerImgbacsi} alt="Banner" className="w-full mt-16 h-[500px] object-cover" />
      <section className="max-w-7xl mx-auto p-4 md:p-10 mt-20 md:mt-28 text-center bg-gray-100 rounded-xl relative">
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
                src={bs.image}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                alt={bs.name}
              />
              <h3 className="font-semibold text-gray-800">{bs.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{bs.spec}</p>
              <p className="text-xs text-gray-500 italic mb-2">{bs.desc}</p>
              <button
                onClick={() => handleViewDoctorDetail(bs)}
                className="bg-[#0077cc] text-white px-4 py-2 rounded hover:bg-[#005fa3]"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>

        {/* Modal chi tiết bác sĩ */}
        {selectedDoctor && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeDetail}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra ngoài
            >
              <button
                onClick={closeDetail}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-32 h-32 object-cover rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{selectedDoctor.name}</h2>
                  <p className="text-gray-600"><strong>Chức vụ:</strong> {selectedDoctor.position}</p>
                  <p className="text-gray-600"><strong>Chuyên ngành:</strong> {selectedDoctor.spec}</p>
                  <p className="text-gray-600"><strong>Kinh nghiệm:</strong> {selectedDoctor.experience} năm</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-[#0077cc] mb-2">Giới thiệu</h3>
                <p className="text-gray-700">{selectedDoctor.introduction}</p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-[#0077cc] mb-2">Thành tựu</h3>
                <p className="text-gray-700">{selectedDoctor.achievements}</p>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default DanhSachBacSi;