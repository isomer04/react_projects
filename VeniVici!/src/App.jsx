import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [catUrl, setCatUrl] = useState("");
  const [catName, setCatName] = useState("");
  const [banList, setBanList] = useState([]);
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    getRandomCatImage();
  }, []);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomBreed = data[randomIndex];

        setCatName(randomBreed.name);
      })
      .catch((error) => console.log(error));
  }, []);

  function fetchCatImage(filter) {
    fetch(`https://api.thecatapi.com/v1/images/search?category_ids=${filter}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCatUrl(data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getRandomCatImage() {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg,png&order=rand&limit=1"
      );
      const data = await response.json();

      console.log(JSON.stringify(data) + "==data");
      const imageUrl = data[0].url;
      const imageId = data[0].id;
      const imageCategories = data[0].categories
        ? data[0].categories.map((category) => category.name)
        : [];
      const catName =
        data[0].breeds && data[0].breeds.length > 0
          ? data[0].breeds[0].name
          : "Unknown";

      if (imageCategories.some((category) => banList.includes(category))) {
        getRandomCatImage();
      } else {
        setCatUrl(imageUrl);
        setCatName(catName);
        setCatList([...catList, { id: imageId, name: catName, url: imageUrl }]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleBanClick(category) {
    setBanList([...banList, category]);
  }

  return (
    <div className="App">
      <h1>Trippin' on Cats</h1>
      <button onClick={() => fetchCatImage(5)}>Funny</button>
      <button onClick={() => fetchCatImage(2)}>Cute</button>
      <button onClick={() => fetchCatImage(1)}>Wild</button>
      <br /> <br />
      <div className="cat-info">
        {catUrl && (
          <img
            style={{ width: "600px", height: "500px" }}
            src={catUrl}
            alt="cat"
          />
        )}
        {catName && <p>Meet {catName}!</p>}
        {catUrl && (
          <div>
            {/* <p>Categories:</p> */}
            <ul>
              {/* {imageCategories.map((category) => (
                <li key={category}>
                  {category}
                  <button onClick={() => handleBanClick(category)}>Ban</button>
                </li>
              ))} */}
            </ul>
          </div>
        )}
      </div>
      <button onClick={getRandomCatImage}>New Cat</button>
      <h2>Saved Cats</h2>
      <div className="cat-gallery">
        {catList.map((cat) => (
          <div className="cat-item" key={cat.id}>
            <img
              style={{ width: "100px", height: "100px" }}
              src={cat.url}
              alt={cat.name}
            />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
