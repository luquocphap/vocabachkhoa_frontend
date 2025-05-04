import './App.css';
import { Login } from './Components/Login/Login';
import { Navbars } from './Components/NavBars/Navbars';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Dict } from './Pages/DictPage';
import { FlashcardPage } from './Pages/FlashcardPage';
import { RegisterPage } from './Pages/RegisterPage';
import { MainPage } from './Pages/MainPage';
import { AIPage } from './Pages/AIPage';
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <AuthProvider>
    <div>
      <BrowserRouter>
        <Navbars/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Dictionary" element={<Dict />} />
          <Route path="/Flashcard" element={<FlashcardPage />} />
          <Route path="/AI" element={<AIPage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
    
  );
}

export default App;
