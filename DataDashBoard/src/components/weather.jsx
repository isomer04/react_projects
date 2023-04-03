import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

import {
  LineChart,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

import "./Weather.css";

function Weather() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [moonPhase, setMoonPhase] = useState("");

  useEffect(() => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=metric&key=Y7R7LTLPLTJ4ZLXJV9JC6PXC7&contentType=json`;

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

  const dataForChart = {
    labels: filterData().map((day) => day.datetime),
    datasets: [
      {
        label: "Moon Phase",
        data: filterData().map((day) => day.moonphase),
        fill: false,
        borderColor: "#3f51b5",
      },
    ],
  };

  return (
    <div>
      <h1>Weather in New York, NY</h1>

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
      {/* <LineChart width={800} height={400} data={filterData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="moonphase" stroke="#8884d8" />
      </LineChart> */}
      <ul className="weather-list">
        {filterData().map((day) => (
          <li key={day.id}>
            {console.log(JSON.stringify(day) + "==day")}

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
              <Link to={`details/${day.datetime}`}>Learn More</Link>
            </div>
          </li>
        ))}
      </ul>
      <LineChart width={800} height={400} data={filterData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="moonphase" stroke="#8884d8" />
      </LineChart>
      <LineChart width={800} height={400} data={filterData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
      </LineChart>


        <ComposedChart
          width={500}
          height={400}
          data={filterData()}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="datetime" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="temp" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="temp" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="temp" stroke="#ff7300" />
          <Scatter dataKey="temp" fill="red" />
        </ComposedChart>
    </div>
  );
}

export default Weather;
