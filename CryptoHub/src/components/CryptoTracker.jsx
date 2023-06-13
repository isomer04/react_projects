import React, { useState, useEffect } from "react";
import CoinInfo from "./coinInfo";
import "../App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY_CRYPTO;

function CryptoTracker() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true); // Introduce a loading state

  useEffect(() => {
    fetchAllCoinData().catch(console.error);
  }, []);

  const fetchAllCoinData = async () => {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" + API_KEY // Add the missing "=" in the API URL
    );
    const json = await response.json();
    setList(json);
    setLoading(false); // Set loading to false once the data is fetched
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <div className="whole-page">
      <h1> Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      {loading ? (
        <h2>Loading...</h2> // Display "Loading..." when the data is being fetched
      ) : (
        <ul>
          {searchInput.length > 0
            ? filteredResults.map((coin) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )
            : list &&
              Object.entries(list.Data).map(([coin]) =>
                list.Data[coin].PlatformType === "blockchain" ? (
                  <CoinInfo
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ) : null
              )}
        </ul>
      )}
    </div>
  );
}

export default CryptoTracker;
