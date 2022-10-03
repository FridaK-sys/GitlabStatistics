import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import Homepage from '../components/Homepage';

describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<Homepage />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
