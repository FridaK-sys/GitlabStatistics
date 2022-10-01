import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Switch } from 'antd';
import { Container } from "react-bootstrap";

export default function Settings() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Container>
        <h3>Settings</h3>
        <p className="pb-2">In order to customize the website you are able to toggle between light and dark mode</p>
        <div className="mt-3 p-4 border border-secondary">
            <h6 className="pb-2">Toggle theme</h6>
            <Switch className="pb-2" onChange={toggleTheme}></Switch>
        </div>
    </Container>
  );
};