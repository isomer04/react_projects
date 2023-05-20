import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const coinInfo = ({ image, name, symbol}) => {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        fetchAllCoinData()
        getCoinPrice().catch(console.error);
    }, [symbol]);

    return (
        <div>
            {price ? ( // rendering only if API call actually returned us data
                <li className="main-list" key={symbol}>
                <img
                  className="icons"
                  src={`https://www.cryptocompare.com${image}`}
                  alt={`Small icon for ${name} crypto coin`}
                />
                {name} <span className="tab"></span> ${price.USD} USD
              </li>
            ): null
            }
        </div>
    )
};


export default coinInfo;