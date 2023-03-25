


import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Weather from "./components/weather";
import './App.css'


function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // https://api.weatherbit.io/v2.0/current?lat=39.744430&lon=-75.545100&daily=true&key=b90dac077381410095cfd77223a52828

    // const response = await fetch("https://api.weatherbit.io/v2.0/current?lat=39.744430&lon=-75.545100&daily=true&key=b90dac077381410095cfd77223a52828");


    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York,%20NY?key=3C3DR7FPTDDTCSHRPTT4VBCZP&include=days&elements=id,temp,feelslikemin,tempmin,datetime,moonphase,sunrise,sunset,moonrise,moonset,description,visibility,conditions");


    // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York,%20NY?key=3C3DR7FPTDDTCSHRPTT4VBCZP&include=days&elements=id,temp,feelslikemin,tempmin,datetime,moonphase,sunrise,sunset,moonrise,moonset,description,visibility,conditions

      // const response = await fetch("https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-03-19&end_date=2023-03-20&key=b90dac077381410095cfd77223a52828");
      const json = await response.json();
      // console.log(JSON.stringify(json) + " =Json")
      // setData(json);
      if (Array.isArray(json)) {
        setData(json);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

 

  const filteredData = (data || []).filter(
    (item) =>
      item.datetime.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterValue === "" || item.category === filterValue)
  );

  console.log(filteredData + "  filteredData")

  const totalItems = data.length;
  const filteredItems = filteredData.length;
  const categories = [...new Set(data.map((item) => item.category))];

  return (
    <div className="App">

      <Weather />

    </div>
  );
}

export default App;
