import React from "react";
import "../styles/MaxScore.scss"

const MaxScore = ({ maxScore, score }) => {
  return (
    <div className="MaxScore">
      <h2>Max Score: {maxScore}</h2>
      <h3>Actual Score: {score}</h3>
    </div>
  );
}