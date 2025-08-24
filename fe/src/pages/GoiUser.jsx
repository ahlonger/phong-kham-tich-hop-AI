// src/pages/GoiUser.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ThanhToan from "./ThanhToan";
import { useLocation } from "react-router-dom";
import bannerImage from "../assets/banner.jpg";
import { FaCheckCircle } from "react-icons/fa";

const GoiUser = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  //lấy từ khóa chỗ tìm kiếm(navbar)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchKeyword = params.get("search")?.toLowerCase() || "";

  const services = [
    {
      title: "Gói Khám Tổng Quát",
      desc: "Khám răng tổng thể, chụp X-quang, tư vấn chuyên sâu với bác sĩ.",
      price: "500.000đ",
      image: bannerImage,
      validity: "Thời hạn 6 tháng",
    },
    {
      title: "Gói Làm Trắng Răng",
      desc: "Làm trắng răng công nghệ Laser Whitening không ê buốt.",
      price: "1.200.000đ",
      image: bannerImage,
      validity: "Thời hạn 6 tháng",
    },
    {
      title: "Gói Niềng Răng Trả Góp",
      desc: "Niềng răng mắc cài kim loại, hỗ trợ trả góp 0% lãi suất.",
      price: "19.000.000đ",
      image: bannerImage,
      validity: "Thời hạn 6 tháng",
    },
  ];

  //tìm kiếm gói 
    const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchKeyword)
  );

  const handleBuy = (service) => {
    setSelectedService(service);
    setIsPaymentOpen(true);
  };

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto p-4 md:p-10 mt-20 md:mt-28 text-center bg-gray-50 rounded-xl shadow">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0077cc] mb-8">
          Gói dịch vụ nổi bật
        </h2>

        {searchKeyword && filteredServices.length === 0 && (
          <p className="text-red-500 font-semibold mb-4">
            Không tìm thấy dịch vụ phù hợp với từ khóa: "{searchKeyword}"
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow hover:-translate-y-1 transition relative"
            >
              <div
                className="w-full h-40 bg-gray-300 mb-4 rounded"
                style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{service.desc}</p>
              <span className="block font-bold text-[#e74c3c] mb-3">
                {service.price}
              </span>
              <p className="text-sm text-gray-500 mb-3">{service.validity}</p>
              <button
                onClick={() => handleBuy(service)}
                className="bg-[#0077cc] text-white px-4 py-2 rounded hover:bg-[#005fa3]"
              >
                Mua
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center">
      <ul className="space-y-4 text-gray-700 text-base ">
        {[
          "Tiết kiệm chi phí so với khám lẻ từng lần.",
          "Ưu tiên lịch hẹn và được chăm sóc bởi đội ngũ bác sĩ giàu kinh nghiệm.",
          "Hưởng nhiều khuyến mãi và dịch vụ kèm theo.",
          "Thời hạn dài – linh hoạt trong sử dụng.",
          "Hỗ trợ trả góp không lãi suất cho các gói lớn.",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <FaCheckCircle className="text-green-500 mt-1" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      </div>

<section className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-xl shadow text-left">
  <h3 className="text-2xl font-bold text-[#0077cc] mb-6 text-center">Bạn cần tư vấn thêm?</h3>
  <form className="space-y-4">
    <input
      type="text"
      placeholder="Họ và tên"
      className="w-full p-3 rounded border"
    />
    <input
      type="tel"
      placeholder="Số điện thoại"
      className="w-full p-3 rounded border"
    />
    <textarea
      placeholder="Nội dung cần tư vấn..."
      className="w-full p-3 rounded border"
      rows="4"
    />
    <button className="w-full bg-[#0077cc] text-white py-2 rounded hover:bg-[#005fa3]">
      Gửi yêu cầu
    </button>
  </form>
</section>





      <ThanhToan
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        service={selectedService}
      />
    </>
  );
};

export default GoiUser;
