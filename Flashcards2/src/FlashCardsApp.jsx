import React, { useState } from "react";
import Counter from "./Counter";
import "./App.css";

const FlashcardsApp = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const cardPairs = [
    { question: "What is the atomic number of carbon?", answer: "6" },
    { question: "What is the chemical symbol for gold?", answer: "Au" },
    {
      question: "What is the common name for sodium chloride?",
      answer: "Table salt",
    },
    { question: "What is the chemical formula for water?", answer: "H2O" },
    { question: "What is the formula for methane?", answer: "CH4" },
    {
      question:
        "What is the pH of a solution with a hydrogen ion concentration of 1 x 10^-9 moles per liter?",
      answer: "pH 9",
    },
    {
      question: "What is the most abundant gas in Earths atmosphere?",
      answer: "Nitrogen (N2)",
    },
    {
      question: "What is the chemical name for baking soda?",
      answer: "Sodium bicarbonate (NaHCO3)",
    },
    {
      question: "What is the process by which a liquid turns into a gas?",
      answer: "Vaporization or evaporation",
    },
    {
      question: "Which element is a liquid at room temperature?",
      answer: "Mercury (Hg)",
    },
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    const nextCard = Math.floor(Math.random() * cardPairs.length);
    setCurrentCard(nextCard);
    setIsFlipped(false);
    setShowResult(false);
    setUserGuess("");
  };

  const handleBack = () => {
    const prevCard = currentCard === 0 ? cardPairs.length - 1 : currentCard - 1;
    setCurrentCard(prevCard);
    setIsFlipped(false);
    setShowResult(false);
    setUserGuess("");
  };

  const handleGuessChange = (event) => {
    setUserGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    if (userGuess.toLowerCase() === currentAnswer.toLowerCase()) {
      alert("You guess it correct");
      setIsCorrect(true);
      setUserGuess("");

    } else {
      alert("You guess it wrong");
      setIsCorrect(false);
      setUserGuess("");

    }
  };

  const currentQuestion = cardPairs[currentCard].question;
  const currentAnswer = cardPairs[currentCard].answer;

  return (
    <div>
      <h1>Chemistry Quiz</h1>
      <p>Let's Test Our Chemistry Knowledge</p>
      <p>Number of cards: {cardPairs.length}</p>
      <Counter count={currentCard} />
      <div className="flashcard" onClick={handleFlip}>
        {isFlipped ? currentAnswer : currentQuestion}
      </div>
      <br /> <br /> <br /> <br />
      <input type="text" value={userGuess} onChange={handleGuessChange} />
      <button onClick={handleGuessSubmit}>Submit</button>
      <button className="prevButton" onClick={handleBack}>
        Previous Card
      </button>
      <button className="nextButton" onClick={handleNext}>
        Next Card
      </button>
      {isCorrect === true && <p className="green">Correct!</p>}
      {isCorrect === false && <p className="red">Incorrect!</p>}
    </div>
  );
};

export default FlashcardsApp;
