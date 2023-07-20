import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from './Main';
import '@testing-library/jest-dom/extend-expect';

test('Displays error message when form is submitted with empty fields', () => {
    render(<Main />);
    const shortenButton = screen.getByText('Shorten URL');
    fireEvent.click(shortenButton);
    const errorMessage = screen.getByText((content, element) => {
        return content === 'Please fill in the form';
    });
    expect(errorMessage).toBeInTheDocument();
});

test('Displays error message when origin URL is invalid', () => {
    render(<Main />);
    const shortenButton = screen.getByText('Shorten URL');
    fireEvent.click(shortenButton);
    const errMessage = screen.getByTestId('err-message');
    expect(errMessage).toBeInTheDocument();
});

test('Displays error message when alias is too short', () => {
    render(<Main />);
    const shortenButton = screen.getByText('Shorten URL');
    fireEvent.click(shortenButton);
    const errMessage = screen.getByTestId('err-alias');
    expect(errMessage).toBeInTheDocument();
});