import React, {useState} from 'react';
import {useAuth} from '../../Context/AuthContext';
import { http } from '../Assets/config';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState(null);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {id, value} = e.target;
    console.log('Field changed: ', id, 'New value:', value)
    setFormData({...formData, [id]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try{
      const response = await http.post("auth/login/", formData);
      login(response.data.metaData.userInfo);
      navigate("/");
    } catch (error){
      console.error("Error during login:", error);
      setError(error.response?.data?.message || "Đăng nhập thất bại");
    }
  }
  return (
    <div className="login-page">
        <form onSubmit={handleSubmit} className="form-login">
            <h1>Đăng Nhập</h1>
            <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Username" required/>
            <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Mật Khẩu" required/>
            <button type="submit">Đăng Nhập</button>
            <p>Bạn chưa có tài khoản? <a href="/register">Đăng Ký</a></p>
            {error && <p className="error-message">Lỗi: {error}</p>}
        </form>
    </div>
  )
}
