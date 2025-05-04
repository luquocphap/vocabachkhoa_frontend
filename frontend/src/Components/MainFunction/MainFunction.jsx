import React from 'react'
import "./MainFunction.css"
import dictionary_img from "../Assets/dictionary_icon.png"
import Flashcard_icon from "../Assets/flashcard_icon.png"
import chatbot_icon from "../Assets/chatbot_icon.png"
import { Link } from 'react-router-dom'
import arrow_icon from "../Assets/arrow.png"
import search_icon from "../Assets/search.png"
import brain_icon from "../Assets/brain_icon.png"
export const MainFunction = () => {
  return (
    <div className="MainFunction">
        <h1>Tiện Ích Cho Người Dùng</h1>
        <hr />

        <div className="function">           
            <div className="dictionary-item">
                <h2>Tra Từ Điển</h2>
                <img src={dictionary_img} alt="Dictionary" className="dictionary-image" />
                <Link to="/Dictionary" className='Dictionary-link'>
                    <button className="Dictionary-button">
                        Tìm từ vựng
                        <img src={search_icon} alt="Dictionary" className="Dictionary-icon" />
                    </button>   
                </Link>

            </div>            
            <div className="Flashcard-item">
                <h2>Flashcard</h2>
                <img src={Flashcard_icon} alt="Flashcard" className="flashcard-image" />
                <Link to="/Flashcard" className='Flashcard-link'>
                    <button className="Flashcard-button">
                        Flashcard
                        <img src={arrow_icon} alt="Flashcard" className="flashcard-icon" />
                    </button>   
                </Link>
            </div>
            <div className="AI-item">
                <h2>AI Translation</h2>
                <img src={chatbot_icon} alt="AI" className="AI-image" />
                <Link to="/AI" className='AI-link'>
                    <button className="AI-button">
                        AI Translation
                        <img src={brain_icon} alt="AI" className="brain-icon" />
                    </button>   
                </Link>
            </div>
        </div>
    </div>
  )
}
