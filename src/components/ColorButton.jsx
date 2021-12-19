import React from "react";
import "@styles/ColorButton.scss"

const ColorButton = ({ color, flash, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`ColorButton ${color} ${flash ? 'flash' : ''}`}
    ></div>
  );
}

export default ColorButton;
