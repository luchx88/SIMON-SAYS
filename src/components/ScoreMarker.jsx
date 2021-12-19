import React from "react";
import "../styles/ScoreMarker.scss";

const ScoreMarker = ({ score }) => {
  return (
    <div className="ScoreMarker">
      <h1>{score}</h1>
    </div>
  );
}

export default ScoreMarker;
