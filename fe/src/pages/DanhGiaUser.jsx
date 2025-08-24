// src/pages/DanhGiaUser.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";

const DanhGiaUser = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoggedIn] = useState(false);
  const [reviews] = useState([
    {
      name: "Phạm Minh Quân",
      rating: 4,
      date: "25/06/2025",
      comment: "Dịch vụ rất tốt, bác sĩ tận tâm. Tôi rất hài lòng!",
    },
    {
      name: "Lê Thanh Hà",
      rating: 3,
      date: "25/06/2025",
      comment: "Dịch vụ tốt, nhưng cần cải thiện thời gian chờ.",
    },
    {
      name: "Phạm Hữu Thân Thương",
      rating: 5,
      date: "25/06/2025",
      comment: "Tuyệt vời, sẽ quay lại lần nữa!",
    },
  ]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Bạn phải đăng nhập để thực hiện đánh giá!");
      return;
    }
    if (rating > 0 && comment.trim()) {
      alert("Cảm ơn bạn đã đánh giá!");
      setRating(0);
      setComment("");
    } else {
      alert("Vui lòng chọn số sao và nhập bình luận!");
    }
  };

  return (
    <>
      <Navbar />
      <section className="max-w-screen-lg w-full mx-auto my-10 p-4 md:p-10 pt-20 bg-gray-50 text-center rounded-xl shadow">
        <h2 className="text-xl md:text-2xl font-bold text-[#0077cc] mb-6">
          Đánh giá của bạn
        </h2>

        <div className="mb-8 text-left">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            Đánh giá từ khách hàng
          </h3>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow mb-4 flex flex-col"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="font-medium">{review.name}</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    className={
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 md:p-8 rounded-lg shadow w-full">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            Viết đánh giá của bạn
          </h3>
          <form
            onSubmit={handleSubmitReview}
            className="space-y-4 text-left w-full"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={30}
                    className={`cursor-pointer ${
                      ratingValue <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRating(ratingValue)}
                  />
                );
              })}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập nội dung đánh giá..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              type="submit"
              className="w-full bg-[#0077cc] text-white py-2 rounded-lg hover:bg-[#005fa3] transition"
            >
              Gửi
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default DanhGiaUser;
