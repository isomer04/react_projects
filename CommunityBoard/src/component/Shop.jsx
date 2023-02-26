import React from "react";
import Event from "./Event";

const Shop = (props) => {
  return (
    <div className="item">

      <img  src={props.image} alt="" srcset="" />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <button onClick={() => window.location.href = props.link}>View More</button>

      {/* <Calender key={index}>
        <img src={shop.image} />
        Name: {shop.title} <br />
        Price: {shop.description}
        <br />
        <button type="button" id={index} >
          Show Details
        </button>
        <br />
        <br /> */}
      
    </div>
  );
};

export default Shop;
