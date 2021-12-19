import React from "react";
import "../styles/FinalScoreModal.scss";

const FinalScoreModal = ({ score, setShowModal }) => {

  const handleClick = () => {
    setShowModal(val => !val);
  }

  return (
    <div className="FinalScoreModal">
      <div className="FinalScoreModal__container">
        <h2>You've lost, try again!</h2>
        <h2>Your final score: {score}</h2>
        <button
          onClick={handleClick}
        >Close</button>
      </div>
    </div>
  );
}

export default FinalScoreModal;
