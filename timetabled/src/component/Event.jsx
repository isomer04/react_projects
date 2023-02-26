import React from "react";

const Event = (props) => {
  return (
    <td className={"Event " + props.color}>
      <h5>{props.event}</h5>
      <h5>Korem</h5>
      <h5>Aorem</h5>
      <h5>Corem</h5>
      <h5>Vorem</h5>
    </td>
    
  );
};

export default Event;
