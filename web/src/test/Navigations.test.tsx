/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';

Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: jest.fn() },
});

/** 
* Test to check if getRepository button works
*/
test("Check if button clicks", () => {
    const {container} = render(<MemoryRouter><Navigation /></MemoryRouter>);
    const button = getByTestId(container, 'getRepository');

    fireEvent.click(button);
})

/** 
* Test to check if input field gets cleard
*/

test("Check if value field is cleard", async () => {
    const {container} = render(<MemoryRouter><Navigation /></MemoryRouter>);
    const button = getByTestId(container, 'clearValues');
    const inputRepo = getByTestId(container, 'repo') as HTMLInputElement
    const inputToken = getByTestId(container, 'token') as HTMLInputElement
    
    fireEvent.click(button);
    await waitFor(() => {
        expect(inputRepo.value).toBe('');
    })
    await waitFor(() => {
        expect(inputToken.value).toBe('');
    })
})