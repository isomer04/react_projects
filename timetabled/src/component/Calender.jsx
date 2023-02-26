import React from "react";
// import Event from "./Event";

const Calender = () => {
  return (
    <div className="Calender">
      Testing the calendar component
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="time">8 am</td>
            {/* <Event event="Fancy Dinner 🎩" color="green" /> */}
            <td>9 am</td>
            <td>10 am</td>
            <td>11 am</td>
            <td>12 pm</td>
            <td>1 pm</td>
            <td>2 pm</td>
            <td className="time">Insert Time</td>
          </tr>

          <tr>
            <td className="time">8 am</td>
            {/* <Event event="Starbucks ☕️" color="green" /> */}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {/* <Event event="Yolk 🍳" color="green" /> */}
            <td></td>
          </tr>

          <tr>
            <td className="time">9 am</td>
            <td></td>
            <td></td>
            <td></td>
            {/* <Event event="Subway 🚊" color="pink" /> */}
            <td></td>
            <td></td>
            {/* <Event event="The Bean 🫘" color="blue" /> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calender;
