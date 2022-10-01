import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Checkbox } from 'antd';

export default function Settings() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="m-4">
        <p>Toggle theme</p>
        <Checkbox onChange={toggleTheme}>Lightmode?</Checkbox>
    </div>
  );
};