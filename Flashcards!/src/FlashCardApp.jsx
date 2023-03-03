import React, { useState } from 'react';

const Flashcard = ({ card }) => {
  const [showQuestion, setShowQuestion] = useState(true);

  const handleCardClick = () => {
    setShowQuestion(!showQuestion);
  }


//   {
//     title: 'Card Set Title',
//     description: 'Short description of card set',
//     cards: [
//       { question: 'Question 1?', answer: 'Answer 1' },
//       { question: 'Question 2?', answer: 'Answer 2' },
//       // ...more cards...
//     ]
//   }
  
  
  return (
    <div className="flashcard" onClick={handleCardClick}>
      <div className="flashcard-content">
        {showQuestion ? card.question : card.answer}
      </div>
    </div>
  );
};

const FlashcardApp = ({ cardSet }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentCardIndex(Math.floor(Math.random() * cardSet.length));
  }

  return (
    <div className="flashcard-app">
      <h1>{cardSet.title}</h1>
      <p>{cardSet.description} - {cardSet.cards.length} cards</p>
      <Flashcard card={cardSet.cards[currentCardIndex]} />
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default FlashcardApp;
