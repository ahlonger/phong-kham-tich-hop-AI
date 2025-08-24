// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import phongkhamImage from "../assets/phongkham.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; 
const Navbar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

    //  Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // hoặc dùng navigate("/dang-nhap")
  };

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  //tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

    const handleSearchKeyDown = (e) => {
    if (e.key == "Enter") {
      // Chuyển hướng sang trang /goi kèm query
      navigate(`/goi?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-blue-600 w-full fixed top-0 left-0 z-50 shadow text-white">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2 font-bold text-lg">
          <img
            src={phongkhamImage}
            alt="Logo"
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
            onError={(e) => {
            e.target.onerror = null; //  chặn vòng lặp vô hạn
            e.target.src = require("../assets/default-avatar.png"); //  dùng ảnh dự phòng local
          }}
          />
          PHÒNG KHÁM GWOUTH
        </div>

        {/* Nav ở giữa - chỉ desktop */}
        <nav className="hidden md:flex flex-grow justify-center gap-6 font-semibold">
          <Link to="/" className="hover:text-yellow-300">Trang chủ</Link>
          <Link to="/danh-sach-bac-si" className="hover:text-yellow-300">Bác sĩ</Link>
          <Link to="/goi" className="hover:text-yellow-300">Gói</Link>
          <Link to="/dat-lich" className="hover:text-yellow-300">Đặt lịch</Link>
          <Link to="/danh-gia-user" className="hover:text-yellow-300">Đánh giá</Link>
        </nav>

        {/* Search + Auth bên phải - chỉ desktop */}
        {user ? (
  <div className="flex items-center gap-3">
    {/* ảnh của benh nhan đăng nhâp vao */}
    {/* <img
      src={user.avatar}
      alt="avatar"
      className="w-8 h-8 rounded-full border border-white object-cover"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/32";
      }}
    /> */}
    <span className="text-sm font-semibold">{user.name}</span>
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
    >
      Đăng xuất
    </button>
  </div>
) : (
  <div className="text-sm font-semibold space-x-2">
    <Link to="/dang-nhap" className="hover:text-yellow-300">Đăng nhập</Link> |
    <Link to="/dang-ky" className="hover:text-yellow-300">Đăng ký</Link>
  </div>
)}


        {/* Hamburger icon - chỉ mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-4 text-center font-semibold">
            <Link to="/" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Trang chủ</Link>
            <Link to="/danh-sach-bac-si" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Bác sĩ</Link>
            <Link to="/goi" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Gói</Link>
            <Link to="/dat-lich" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Đặt lịch</Link>
            <Link to="/danh-gia-user" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Đánh giá</Link>
          </nav>

          <div className="mt-4 flex flex-col gap-4">
           <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            className="px-3 py-1 rounded-md text-black w-48"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
            <div className="text-sm font-semibold text-center space-x-2">
              <Link to="/dang-nhap" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Đăng nhập</Link> |
              <Link to="/dang-ky" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Đăng ký</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
