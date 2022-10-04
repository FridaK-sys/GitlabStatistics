import React from 'react';
import { fireEvent, getByRole, getByTestId, render, screen, waitFor } from '@testing-library/react';
import Navigation from '../components/Navigation';
import userEvent from '@testing-library/user-event';


test("Check if button clicks", () => {
    const {container} = render(<Navigation />);

    const button = getByTestId(container, 'getRepository');
    fireEvent.click(button);
})

test("Check if value field is cleard", async () => {
    const {container} = render(<Navigation />);
    const button = getByTestId(container, 'clearValues');
    const inputRepo = getByTestId(container, 'repo') as HTMLInputElement
    const inputToken = getByTestId(container, 'token') as HTMLInputElement
    
    
    fireEvent.click(button);
    
    await waitFor(() => {
        expect(inputRepo.value).toBe('');
        expect(inputToken.value).toBe('');
        
     })
})