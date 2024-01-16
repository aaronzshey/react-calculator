import React, { useState } from "react";
import "./ThemeToggleWrapper.css";

const ThemeToggleWrapper = ({ children }) => {
  return <div className="themeToggle">{children}</div>;
};

export default ThemeToggleWrapper;
