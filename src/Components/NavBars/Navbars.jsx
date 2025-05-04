import React from "react";
import "./Navbars.css";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const Navbars = () => {
  const [menu, setMenu] = React.useState("Movie");
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="Navbars">
      <div onClick={() => {setMenu("Main")}} className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link style={{textDecoration: "none"}} to="/">
          <h1>VocaBachKhoa</h1>
        </Link>
      </div>
      <ul className="navbar-menu">
        <li
          onClick={() => {
            setMenu("Dictionary");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/Dictionary">
            Tra Từ Điển
          </Link>
          {menu === "Dictionary" ? <hr /> : <></>}
        </li>
        
        <li
          onClick={() => {
            setMenu("Flashcard");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/Flashcard">
            Flashcard
          </Link>
          {menu === "Flashcard" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu("AI");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/AI">
            AI Translation
          </Link>
          {menu === "AI" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="navbar-login">
        {user ? (
          // Hiển thị khi đã đăng nhập
          <div className="user-info">
            <span>{user.username}</span>
            <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
          </div>
        ) : (
          // Hiển thị khi chưa đăng nhập
          <>
            <Link  style={{ textDecoration: "none" }} to="/login">
              <button onClick={() => setMenu("Login")}>Đăng Nhập</button>
            </Link>
            <Link  style={{ textDecoration: "none" }} to="/register">
              <button onClick={() => setMenu("Register")}>Đăng Ký</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
