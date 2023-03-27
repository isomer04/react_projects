import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "./Weather.css";

function Weather() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [moonPhase, setMoonPhase] = useState("");

  useEffect(() => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=metric&key=Y7R7LTLPLTJ4ZLXJV9JC6PXC7&contentType=json`;
    // const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York,%20NY?key=3C3DR7FPTDDTCSHRPTT4VBCZP&include=days&elements=id,temp,feelslikemin,tempmin,datetime,moonphase,sunrise,sunset,moonrise,moonset,description,visibility,conditions`;

    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();

      setData(json.days);

      //   console.log(JSON.stringify(json.days[0].datetimeEpoch) + "==json.days")
    };

    fetchData();
  }, []);

  const filterData = () => {
    let filteredData = data;

    // Filter by date range
    if (startDate !== "" && endDate !== "") {
      filteredData = filteredData.filter(
        (day) =>
          new Date(day.datetime) >= new Date(startDate) &&
          new Date(day.datetime) <= new Date(endDate)
      );
    }

    // Filter by moon phase
    if (moonPhase !== "") {
      filteredData = filteredData.filter(
        (day) =>
          day.moonphase >= parseFloat(moonPhase) - 0.25 &&
          day.moonphase <= parseFloat(moonPhase) + 0.25
      );
    }

    return filteredData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData(filterData());
  };

  return (
    <div>
      <Navigation />

      <h1>Weather in New York, NY</h1>

      {/* console.log(filterData() + "filteredData"); */}

      {/* <h5>Time: {filteredData.days[0].datetimeEpoch}</h5> */}
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
        <label>
          Moon Phase:
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={moonPhase}
            onChange={(event) => setMoonPhase(event.target.value)}
          />
          <span>{moonPhase}</span>
        </label>
        <button type="submit">Filter</button>
      </form>
      <ul className="weather-list">
        {filterData().map((day) => (
          <li key={day.id}>
            <div className="weather-item">
              <div className="weather-item-column">
                <p>Date: {day.datetime}</p>
                <p>
                  Time: {day.sunrise} - {day.sunset}
                </p>
                <p>Moon phase: {day.moonphase}</p>
              </div>
              <div className="weather-item-column">
                <p>Temperature: {day.temp}</p>
                <p>Feels like: {day.feelslikemin}</p>
                <p>Conditions: {day.conditions}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;
