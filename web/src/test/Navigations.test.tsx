import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import Navigation from '../components/Navigation';

test("Click", () => {
    const {container} = render(<Navigation />);

    const button = getByTestId(container, 'getRepository');
    fireEvent.click(button);
})


