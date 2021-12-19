import React from "react";
import "../styles/StartButton.scss"

const StartButton = ({ setIsOn }) => {
  const handleClick = () => {
    setIsOn(true);
  }

  return (
    <div className="StartButton" onClick={handleClick}>
      <h1>Start</h1>
    </div>
  );
}

export default StartButton;
