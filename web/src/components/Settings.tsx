import { Container } from "react-bootstrap";
import React from "react";
import { Switch } from 'antd';
import { ThemeContext } from "../context/ThemeContext";

/** 
* Class component that returns Setting component instance
*/
export default class Settings extends React.Component {
  static contextType = ThemeContext; //theme for settings component
  context!: React.ContextType<typeof ThemeContext>;
  
  render() {
    const { toggleTheme } = this.context!;

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
  }
};