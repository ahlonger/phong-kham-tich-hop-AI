// src/pages/BenhNhan.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThanhToan from "./ThanhToan";
import DanhGiaUser from "./DanhGiaUser";
import bannerImg from "../assets/banner.jpg";
import bacsiImg from "../assets/bacsi.png";
import serviceImg1 from "../assets/banner.jpg";
import serviceImg2 from "../assets/banner.jpg";
import serviceImg3 from "../assets/banner.jpg";
import BacSi from "../assets/bacsi1.png";
const BenhNhan = () => {
  const [rating, setRating] = useState(0);
  const [isLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([
    { name: "Phạm Minh Quân", rating: 4, date: "25/06/2025", comment: "Dịch vụ rất tốt, bác sĩ tận tâm. Tôi rất hài lòng!" },
    { name: "Lê Thanh Hà", rating: 3, date: "25/06/2025", comment: "Dịch vụ tốt, nhưng cần cải thiện thời gian chờ." },
    { name: "Phạm Hữu Thân Thương", rating: 5, date: "25/06/2025", comment: "Tuyệt vời, sẽ quay lại lần nữa!" },
  ]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);



  const handleBuy = (service) => {
    setSelectedService(service);
    setIsPaymentOpen(true);
  };

  return (
    <div className="bg-[#f7f9fc]">
      <Navbar />
      <div className="pt-16">
        {/* Banner */}
        <div id="home" className="w-full relative">
          <img src={bannerImg} alt="Banner" className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="text-center text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">Phòng khám Anh Thương đẹp trai</h1>
              <p className="text-base md:text-lg mb-4">Nơi mang đến nụ cười hoàn hảo với đội ngũ bác sĩ chuyên môn thấp và công nghệ lỗi thời.</p>
              <h2 className="text-sm md:text-base">Chúng tôi cam kết cho rụng răng hết những thằng nói mất dạy</h2>
              <button className="bg-[#0077cc] text-white px-6 py-3 rounded-lg hover:bg-[#005fa3] mt-5 transition">Đặt lịch ngay</button>
            </div>
          </div>
        </div>

{/* Giới thiệu phòng khám */}
<section className="w-full max-w-[1200px] mx-auto mt-10 p-6 md:p-10 bg-white rounded-xl shadow text-center">
  <h2 className="text-xl md:text-2xl font-bold text-[#0077cc] mb-6 animate-fade-in">Về Phòng Khám Chuyên Khoa Growth</h2>
  <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl mx-auto mb-6">
    Với hơn <span className="font-semibold text-[#0077cc]">nhiều năm kinh nghiệm</span> trong ngành nha khoa, phòng khám của chúng tôi tự hào mang đến dịch vụ chuyên nghiệp, đội ngũ bác sĩ tận tâm và cơ sở vật chất hiện đại. 
    Chúng tôi cam kết đem lại trải nghiệm thoải mái, an toàn và hiệu quả cho mỗi khách hàng.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-left">
    {[
      { icon: "🦷", title: "Trang thiết bị hiện đại", desc: "Áp dụng công nghệ tiên tiến trong điều trị và thẩm mỹ răng miệng." },
      { icon: "👨‍⚕️", title: "Đội ngũ bác sĩ giàu kinh nghiệm", desc: "Tư vấn tận tâm, điều trị chính xác – luôn lắng nghe người bệnh." },
      { icon: "🌟", title: "Khách hàng hài lòng", desc: "Hơn 10.000 khách hàng tin tưởng và lựa chọn." },
    ].map((item, idx) => (
      <div key={idx} className="flex items-start gap-4 bg-[#f1faff] p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <div className="text-3xl">{item.icon}</div>
        <div>
          <h4 className="font-bold text-[#0077cc]">{item.title}</h4>
          <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Danh sách bác sĩ */}
        <section id="danh-sach-bac-si" className="w-full max-w-[1200px] mx-auto p-5 md:p-10 rounded-xl text-center bg-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-[#0077cc] mb-8">Danh sách bác sĩ</h2>
          <div className="flex flex-wrap justify-center md:justify-between gap-6">
            {[{ name: "BS. Nguyễn Văn A", spec: "Răng Hàm Mặt" }, { name: "BS. Trần Thị B", spec: "Nha chu" }, { name: "BS. Lê Văn C", spec: "Cấy ghép Implant" }, { name: "BS. Phạm Thị D", spec: "Nha khoa thẩm mỹ" }].map((bs, i) => (
              <div key={i} className="bg-white p-5 rounded-xl w-full sm:w-[45%] md:w-[23%] shadow hover:-translate-y-1 transition">
                <img src={BacSi} className="w-24 h-24 object-cover rounded-full mx-auto mb-4" alt={bs.name} />
                <h3 className="font-semibold text-gray-800">{bs.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{bs.spec}</p>
                <button className="bg-[#0077cc] text-white px-4 py-2 rounded hover:bg-[#005fa3]">Xem chi tiết</button>
              </div>
            ))}
          </div>
        </section>

      {/* Video */}
        <section className="w-full max-w-[1200px] mx-auto my-12 px-4 md:px-10 py-10 text-center bg-white rounded-xl shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0077cc] mb-6">Video Giới Thiệu Phòng Khám</h2>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://youtu.be/n8xX8M0U3aY?si=JCp8pC-SleqE45X6"
              title="Giới thiệu phòng khám"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>


        {/* Gói dịch vụ */}
        <section id="goi-dich-vu" className="w-full max-w-[1200px] mx-auto my-10 p-5 md:p-10 bg-gray-50 text-center rounded-xl shadow">
          <h2 className="text-xl md:text-2xl font-bold text-[#0077cc] mb-8">Gói dịch vụ nổi bật</h2>
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            {[
              { title: "Gói Khám Tổng Quát", desc: "Khám răng tổng thể, chụp X-quang, tư vấn chuyên sâu với bác sĩ.", price: "500.000đ", image: serviceImg1, validity: "Thời hạn 6 tháng" },
              { title: "Gói Làm Trắng Răng", desc: "Làm trắng răng công nghệ Laser Whitening không ê buốt.", price: "1.200.000đ", image: serviceImg2, validity: "Thời hạn 6 tháng" },
              { title: "Gói Niềng Răng Trả Góp", desc: "Niềng răng mắc cài kim loại, hỗ trợ trả góp 0% lãi suất.", price: "19.000.000đ", image: serviceImg3, validity: "Thời hạn 6 tháng" },
            ].map((service, idx) => (
              <div key={idx} className="w-full md:w-[32%] bg-white p-5 rounded-xl shadow hover:-translate-y-1 transition relative">
                <div className="w-full h-40 bg-gray-300 mb-4" style={{ backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.desc}</p>
                <span className="block font-bold text-[#e74c3c] mb-3">{service.price}</span>
                <p className="text-sm text-gray-500 mb-3">{service.validity}</p>
                <button onClick={() => handleBuy(service)} className="bg-[#0077cc] text-white px-4 py-2 rounded hover:bg-[#005fa3]">Mua</button>
              </div>
            ))}
          </div>
        </section>

        {/* Đặt lịch */}
      

        {/* Đánh giá */}
        <section id="danh-gia" className="w-full max-w-[1200px] mx-auto my-10 p-5 md:p-10 bg-gray-50 text-center rounded-xl shadow">
          <DanhGiaUser />
        </section>

{/* Ưu điểm nổi bật */}
<section className="w-full max-w-[1200px] mx-auto my-12 px-4 md:px-10 py-10 bg-gradient-to-r from-[#e3f2fd] via-[#ffffff] to-[#e1f5fe] rounded-xl shadow-lg">
  <h2 className="text-center text-2xl md:text-3xl font-bold text-[#0077cc] mb-10 animate-fade-in">
    Tại sao khách hàng luôn chọn Phòng Khám Anh Thương?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {[
      {
        img: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
        title: "Tư vấn tận tâm",
        desc: "Đội ngũ nhân viên luôn sẵn sàng lắng nghe và hỗ trợ chu đáo mọi vấn đề của bạn.",
      },
      {
        img: "https://cdn-icons-png.flaticon.com/512/2769/2769339.png",
        title: "Giá cả hợp lý",
        desc: "Dịch vụ chất lượng cao nhưng chi phí luôn minh bạch và cạnh tranh nhất thị trường.",
      },
      {
        img: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
        title: "Không gian hiện đại",
        desc: "Phòng khám khang trang, sạch sẽ, tạo cảm giác thoải mái như ở nhà.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
      >
        <img src={item.img} alt={item.title} className="w-20 h-20 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#0077cc] mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.desc}</p>
      </div>
    ))}
  </div>
</section>


        <Footer />
      </div>

      <ThanhToan isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} service={selectedService} />
    </div>
  );
};

export default BenhNhan;
