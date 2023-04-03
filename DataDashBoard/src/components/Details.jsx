import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import "./Weather.css";

function Details() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=metric&key=Y7R7LTLPLTJ4ZLXJV9JC6PXC7&contentType=json`;

    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();

      // Filter the data to find the object with the specified date
      const dayData = json.days.filter((day) => day.datetime === id)[0];
      setData(dayData);
      console.log(JSON.stringify(dayData) + "==dayData");
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Weather in New York, NY</h1>
      <div className="weather-list">
        {data && (
          <div className="weather-item">
            <div className="weather-item-column">
              <p>Date: {data.datetime}</p>
              <p>
                Time: {data.sunrise} - {data.sunset}
              </p>
              <p>Moon phase: {data.moonphase}</p>
            </div>
            <div className="weather-item-column">
              <p>Temperature: {data.temp}</p>
              <p>Feels like: {data.feelslike}</p>
              <p>Conditions: {data.conditions}</p>
              <p>Humidity: {data.humidity}</p>
              <p>windspeed: {data.windspeed}</p>
              <p>Description: {data.description}</p>


            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default Details;
