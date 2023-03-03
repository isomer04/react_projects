import "./App.css";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const updateCount = () => setCount(count + multiplier);

  const buyDoubleStuffed = () => {
    if (count >= 10) {
      setMultiplier(multiplier * 2);
      window.alert("Double Stuffed Started");
    }
  };

  const buyPartyPack = () => {
    if (count >= 100) {
      setMultiplier(multiplier * 5);
      setCount(count - 100);
      window.alert("Party Pack Started");
    }
  };

  const buyFullFeast = () => {
    if (count >= 1000) {
      setMultiplier(multiplier * 10);
      setCount(count - 1000);
      window.alert("Full Feast started");
    }
  };

  return (
    <div className="App">
      <div className="Header">
        <h1>Samosa Selector</h1>
        <h2> Count: {count} </h2>
        <img
          className="samosa"
          src="https://helpful-griffin-0a0ba5.netlify.app/samosa.png"
          onClick={updateCount}
        />
      </div>
      <div className="container">
        <div className="upgrade">
          <h3>Double Stuffed</h3>
          <p>2x per click</p>
          <button onClick={buyDoubleStuffed}>10 samosas 👯‍♀️</button>
        </div>
        <div className="upgrade">
          <h3>Party Pack</h3>
          <p>5x per click</p>
          <button onClick={buyPartyPack}>100 samosas 🎉</button>
        </div>
        <div className="upgrade">
          <h3>Full Feast</h3>
          <p>10x per click</p>
          <button onClick={buyFullFeast}>1000 samosas 👩🏽‍🍳</button>
        </div>
      </div>
    </div>
  );
};

export default App;
