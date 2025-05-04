import React, { useState } from "react";
import "./Dictionary.css";
import { http1 } from "../Assets/dictionary";
import { http } from "../Assets/config";
import search_icon from "../Assets/search.png";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dictionary = () => {
  const { user } = useAuth();
  const UID = user?.U_ID;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [successSave, setSuccessSave] = useState(false);
  const [saved, setSaved] = useState(false);
  const [existed, setExisted] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDefinitions([]);
    setSynonyms([]);
    setAntonyms([]);
    setError("");
    try {
      const response = await http1.get(`${search}`);
      const meaning = response.data[0]?.meanings[0];
      console.log(response);
      if (meaning) {
        // Lấy definitions
        const defs = meaning.definitions.map((def) => def.definition);
        setDefinitions(defs);
        setSynonyms(meaning.synonyms || []);
        setAntonyms(meaning.antonyms || []);
      } else {
        setError("Không tìm thấy nghĩa cho từ này.");
      }
    } catch (err) {
      setError("Không tìm thấy từ hoặc có lỗi xảy ra.");
    }
    setLoading(false);
    setSearched(true);
  };

  const handleSave = async () => {
    if (!search || definitions.length === 0) return;
    if (!user || !user.U_ID){
      alert("Bạn cần phải đăng nhập");
      navigate("/login");
      return;
    }

    const saveData = {
      UID: UID,
      WORD: search,
      MEANINGS: definitions[0],
    };

    try {
      const response = await http.post("/vocab/save/", saveData);
      console.log(response);
      setSuccessSave(true);
      setSaved(true);
    } catch (err) {
      setSaved(false);
      setSuccessSave(false);
      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message.includes("Giá trị đã tồn tại")) {
          setExisted(true);
        } else {
          alert(err.response.data.message);
        }
      } else {
        alert("Có lỗi xảy ra khi lưu từ vựng!");
      }
      console.error("Xảy ra lỗi: ", err);
    }
  };

  return (
    <div className="dictionary">
      <form className="dictionary-search-form" onSubmit={handleSearch}>
        <input
          className="dictionary-search-input"
          type="text"
          placeholder="Nhập từ cần tra..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearched(false);
            setSaved(false);
            setExisted(false);
          }}
        />
        <button
          className="dictionary-search-btn"
          type="submit"
          disabled={loading || !search.trim()}
        >
          {loading ? "Đang tìm..." : "Tìm kiếm"}{" "}
          <img src={search_icon} alt="search" />
        </button>
      </form>
      {searched && (
        <div className="dictionary-result">
          {error && <div className="dictionary-error">{error}</div>}
          {definitions.length > 0 && (
            <div>
              <div>
                <b>Từ:</b> {search}
              </div>
              <div>
                <b>Nghĩa:</b>
                <ul>
                  {definitions.map((def, idx) => (
                    <li key={idx}>{def}</li>
                  ))}
                </ul>
              </div>
              {synonyms.length > 0 && (
                <div>
                  <b>Đồng nghĩa:</b> {synonyms.join(", ")}
                </div>
              )}
              {antonyms.length > 0 && (
                <div>
                  <b>Trái nghĩa:</b> {antonyms.join(", ")}
                </div>
              )}
            </div>
          )}
          <button className="save-btn" onClick={handleSave}>
            Lưu Từ Vựng
          </button>
          {saved &&
            (successSave ? (
              <span className="success">Đã Lưu Thành Công!</span>
            ) : (
              <span className="fail">Lưu Thất Bại</span>
            ))}
          {existed && <span className="fail">Từ Này Đã Tồn Tại Trong Study List</span>}
        </div>
      )}
    </div>
  );
};
