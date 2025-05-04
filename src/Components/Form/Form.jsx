import React, { useState } from "react";
import { http } from "../Assets/config";
import "./Form.css";
export const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterSuccess(false);

    try {
      const response = await http.post("auth/register/", formData); // Gọi API đăng ký
      console.log("Register response:", response.data);
      setRegisterSuccess(true);
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleRegister} className="form-register">
        <h1>Đăng Ký</h1>

        <label htmlFor="family-name" className="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="">
          Mật Khẩu
        </label>
        <input type="password" id="password" placeholder="Mật Khẩu" value={formData.password} onChange={handleChange} required/>

        <button className="register-button">Đăng Ký</button>
        {registerError && <p className="error-message">Lỗi: {registerError}</p>}
        {registerSuccess && <p className="success-message">Đăng ký thành công!</p>}
      </form>
      
    </div>
  );
};

export default Form;
