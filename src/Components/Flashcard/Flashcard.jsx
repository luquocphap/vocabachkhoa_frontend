import React, { useEffect, useState } from 'react'
import "./Flashcard.css"
import { http } from '../Assets/config';
import { useAuth } from '../../Context/AuthContext';
import go_icon from '../Assets/go.png'
import back_icon from '../Assets/back.png'
import { useNavigate } from 'react-router-dom';

export const Flashcard = () => {
  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.U_ID) {
      alert("Bạn phải đăng nhập để sử dụng chức năng này!");
      navigate("/login");
      return;
    }
    const fetchVocab = async () => {
      setLoading(true);
      setError(null);
      try{
        const response = await http.get(`/vocab/show/?U_ID=${user.U_ID}`)
        if (response.data && response.data.metaData && Array.isArray(response.data.metaData.vocab_list)){
          setVocabList(response.data.metaData.vocab_list);
        } else{
          setVocabList([response.data.metaData.vocab_list]);
        }
      } catch (error){
        setError(error);
      } finally{
        setLoading(false);
      }
    };
    fetchVocab();
  }, [user, navigate]);

  if (loading) return <div>Đang tải dữ liệu...</div>
  if (error) return <div>Lỗi: {error.message || error.toString()}</div>
  if (vocabList.length === 0) return <div>Không có từ vựng</div>

  const word = vocabList[current]?.WORD;
  const meaning = vocabList[current]?.MEANINGS;

  const handlePrev = () => {
    setDeleted(false);
    setShowMeaning(false);
    setCurrent((prev) => (prev === 0 ? vocabList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDeleted(false);
    setShowMeaning(false);
    setCurrent((prev) => (prev === vocabList.length - 1 ? 0 : prev + 1));
  };

  const handleFlip = () => setShowMeaning((prev) => !prev);

  const handleDelete = async () =>{
    setLoading(true);
    setError(null);


    try{
      const response = await http.delete("/vocab/delete/", { data: { U_ID: user.U_ID, WORD: word } });
      console.log(response);
      setVocabList(prev =>
        prev.filter((item, idx) => idx !== current)
      );

      setCurrent(prev => {
        if (prev >= vocabList.length - 1) {
          return Math.max(0, prev - 1);
        }
        return prev;
      });
      setDeleted(true);
      
    } catch (err){
      setError(error)
      console.error(err);
      setLoading(false);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="flashcard">
      <h1>Flashcard Từ Vựng</h1>
      <div onClick={handleFlip} className="flashcard-box">
        {showMeaning ? (
          <div className="flashcard-meaning">{meaning}</div>
        ) : ( 
          <div className="flashcard-word">{word}</div>
        )}
      </div>
      <div className="flashcard-controls">
        <button onClick={handlePrev}><img className='icon' src={back_icon} alt='back'/></button>
        <span>{current + 1} / {vocabList.length}</span>
        <button onClick={handleNext}><img className='icon' src={go_icon} alt='go'/></button>
      </div>
      <button className='delete-btn' onClick={handleDelete}>Xóa Từ Này</button>
    </div>
  )
}