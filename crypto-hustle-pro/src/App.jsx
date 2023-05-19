import { useState, useEffect } from "react";

import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(0);

  useEffect(() => {
    fetchAllCoinData().catch(console.error);
  }, []);

  const fetchAllCoinData = async () => {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      // how do we call an API using fetch?
    );
    const json = await response.json();
    setList(json);
  };

  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <ul>
          {list &&
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <li key={list.Data[coin].FullName}>
                  {list.Data[coin].FullName}
                </li>
              ) : null
            )}
        </ul>
      </div>
    </>
  );
}

export default App;
