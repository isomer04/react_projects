import React from "react";

const Shop = (props) => {
  return (
    <div className="item">
      <img src={props.image} alt="" />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <button onClick={() => (window.location.href = props.link)}>
        View More
      </button>
    </div>
  );
};

export default Shop;
