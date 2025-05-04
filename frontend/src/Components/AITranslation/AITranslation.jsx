import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import arrow_icon from '../Assets/arrow.png'
import './AITranslation.css';

export const AITranslation = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  let API_key = "AIzaSyAa0_yqEjdArIthhw1lS_IwerTAjCvPcxk";
  const AI = new GoogleGenAI({ apiKey: API_key });

  async function translateText(text, targetLanguage, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await AI.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Translate the following text into ${targetLanguage}: ${text}. Give the translation in ${targetLanguage} only. SHOULD TRANSLATE NATURALY AND UNDERSTANDABLY FOR ${targetLanguage}`
        });

        if (response && response.text) {
          return response.text;
        } else {
          console.error("Error: Translation response not received.");
          return null;
        }
      } catch (error) {
        if (error.message.includes("503") && attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          console.error("API request failed:", error);
          return null;
        }
      }
    }
  }

  const handleTranslate = async () => {
    setLoading(true);
    setOutput('');
    const result = await translateText(input, "Vietnamese");
    setOutput(result || "Không thể dịch văn bản.");
    setLoading(false);
  };

  return (
    <div className="ai-translation-container">
      {/* Input Box */}
      <div className="ai-translation-box">
        <div className="ai-translation-title">Nhập nội dung cần dịch</div>
        <textarea   
          className="ai-translation-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nhập văn bản..."
        />
        <button onClick={handleTranslate} disabled={loading || !input.trim()}>
          {loading ? "Đang dịch..." : "Dịch"}
          <img src={arrow_icon} alt='translate' className='arrow-icon' />
        </button>
      </div>

      {/* Output Box */}
      <div className="ai-translation-box output">
        <div className="ai-translation-title">Kết quả dịch</div>
        <div className="ai-translation-output-content">
          {output}
        </div>
      </div>
    </div>
  );
};

export default AITranslation;