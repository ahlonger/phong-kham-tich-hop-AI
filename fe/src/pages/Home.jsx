// src/pages/Home.jsx
import React from "react";
import bannerImg from "../assets/banner.jpg";

const Home = () => {
  return (
    <div id="home" className="w-full relative">
      <img src={bannerImg} alt="Banner" className="w-full h-[500px] object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Phòng khám Anh Thương đẹp trai</h1>
          <p className="text-lg mb-6">Nơi mang đến nụ cười hoàn hảo với đội ngũ bác sĩ chuyên môn thấp và công nghệ lỗi thời.</p>
          <h2>Chúng tôi cam kết cho rụng răng hết những thằng nói mất dạy</h2>
          <button className="bg-[#0077cc] text-white px-6 py-3 rounded-lg hover:bg-[#005fa3] mt-5 transition">Đặt lịch ngay</button>
        </div>
      </div>
    </div>
  );
};

export default Home;