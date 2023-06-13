import React, { useState, useEffect } from "react";
import "../App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY_CRYPTO_NEWS;

function CryptoNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptoNews().catch(console.error);
  }, []);

  const fetchCryptoNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=crypto&apiKey=${API_KEY}`
    );
    const data = await response.json();
    if (data && data.articles) {
      setNewsList(data.articles);
      setLoading(false);
    }
  };

  return (
    <div className="whole-page">
      <h1>Crypto News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="news-list">
          {newsList.map((news, index) => (
            news.urlToImage && (
              <li key={index} className="news-item">
                <div className="news-content">
                  <img src={news.urlToImage} alt={news.title} />
                  <div className="news-details">
                    <h3>
                      <a href={news.url} target="_blank" rel="noopener noreferrer">
                        {news.title}
                      </a>
                    </h3>
                    <p>{news.content}</p>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
}

export default CryptoNews;
