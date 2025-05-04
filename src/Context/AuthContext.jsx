import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Lưu thông tin user (VD: { id: 1, name: 'Tên User' })
  const [isLoading, setIsLoading] = useState(true); // Trạng thái kiểm tra lúc đầu

  // Kiểm tra xem có thông tin user trong localStorage khi tải lại trang không
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi parse user từ localStorage:", error);
        localStorage.removeItem('user'); // Xóa nếu dữ liệu lỗi
      }
    }
    setIsLoading(false); // Đã kiểm tra xong
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Lưu vào localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Xóa khỏi localStorage
    // Có thể thêm chuyển hướng về trang chủ hoặc login tại đây nếu cần
  };

  // Chưa kiểm tra xong thì chưa render gì cả (hoặc hiện loading)
  if (isLoading) {
    return <div>Đang tải...</div>; // Hoặc null, hoặc spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook tùy chỉnh để dễ dàng sử dụng context
export const useAuth = () => {
  return useContext(AuthContext);
};