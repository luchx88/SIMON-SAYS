import React from "react";
import "../styles/MaxScore.scss"

const MaxScore = ({ maxScore }) => {
  const maxScoreValue = Math.max(...maxScore)
  return (
    <div className="MaxScore">
      <h2>Max Score: {maxScoreValue}</h2>
    </div>
  );
}

export default MaxScore;