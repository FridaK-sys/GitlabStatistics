import { render, screen } from '@testing-library/react';

import React from 'react';
import Settings from '../components/Settings';
import renderer from "react-test-renderer";

describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<Settings />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
