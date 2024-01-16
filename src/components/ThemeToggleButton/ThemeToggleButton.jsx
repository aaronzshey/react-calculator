import React from "react";
import "./ThemeToggleButton.css";

const ThemeToggleButton = ({ className, children, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default ThemeToggleButton;
