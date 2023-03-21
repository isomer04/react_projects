import React, { useState, useEffect } from 'react';

const VeniVici = () => {
  const [catData, setCatData] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/0XYvRd7oD');
    const data = await response.json();
    setCatData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, [catData]);

  const handleBan = (attribute) => {
    setBanList([...banList, attribute]);
    if (banList.length === 0) {
      setCatData(null); // reset catData to null to force re-render on next displayData() call
      fetchData();
    }
  };

  const isBanned = (attribute) => {
    return banList.includes(attribute);
  };

  const displayData = () => {
    if (!catData) return null;
    const { url, breeds } = catData;
    const breedNames = breeds?.map((breed) => breed.name) || [];
    const filteredBreeds = breedNames.filter((name) => !isBanned(name));
    if (filteredBreeds.length === 0) {
      setBanList([]);
      return null;
    }
    const selectedBreed = filteredBreeds[Math.floor(Math.random() * filteredBreeds.length)];
    return (
      <div>
        <img src={url} alt="cat" />
        <p>Breed: {selectedBreed}</p>
        <button onClick={() => handleBan(selectedBreed)}>Ban breed</button>
      </div>
    );
  };

  return (
    <div>
      <h1>Veni Vici!</h1>
      <button onClick={fetchData}>Discover more</button>
      {displayData()}
    </div>
  );
};

export default VeniVici;
