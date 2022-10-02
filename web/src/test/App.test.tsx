import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from '../App';

describe("<LoginForm />", () => {
  7  ; test("should display a blank login form, with remember me checked by default", async () => {
  8
  9  });
  10});
  
describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
