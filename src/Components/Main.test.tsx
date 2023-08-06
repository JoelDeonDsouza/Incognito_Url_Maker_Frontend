import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
// Component //
import Main from './Main';

// Mock axios.post //
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({ data: { maskedUrl: 'http://localhost:6000/' } });

// Helper function to wait for the loading spinner to disappear //
const waitForLoaderToBeFalse = async () => {
    await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
};

describe('Main Component', () => {
    beforeEach(() => {
        mockedAxios.post.mockClear();
    });

    it('should render the main form and show error when form is submitted with invalid input', () => {
        render(<Main />);
        const shortenButton = screen.getByText('Shorten URL');
        fireEvent.click(shortenButton);
        expect(screen.getByTestId('err-message')).toHaveTextContent('Please fill in the form');
    });

    it('should render the main form and show error when invalid URL is entered', () => {
        render(<Main />);
        const originUrlInput = screen.getByPlaceholderText('Enter long link here *');
        const aliasInput = screen.getByPlaceholderText('Enter alias *');
        const shortenButton = screen.getByText('Shorten URL');
        fireEvent.change(originUrlInput, { target: { value: 'invalid-url' } });
        fireEvent.change(aliasInput, { target: { value: 'testcall' } });
        fireEvent.click(shortenButton);
        expect(screen.getByTestId('err-message')).toHaveTextContent('Enter a valid URL');
    });

    it('should render the main form and show error when alias is too short', () => {
        render(<Main />);
        const originUrlInput = screen.getByPlaceholderText('Enter long link here *');
        const aliasInput = screen.getByPlaceholderText('Enter alias *');
        const shortenButton = screen.getByText('Shorten URL');
        fireEvent.change(originUrlInput, { target: { value: 'https://www.google.com/' } });
        fireEvent.change(aliasInput, { target: { value: 'test' } });
        fireEvent.click(shortenButton);
        expect(screen.getByTestId('err-message')).toHaveTextContent('Alias should be at least 5 characters long');
    });

    it('should render the main form and submit the form with valid input', async () => {
        render(<Main />);
        const originUrlInput = screen.getByPlaceholderText('Enter long link here *');
        const aliasInput = screen.getByPlaceholderText('Enter alias *');
        const shortenButton = screen.getByText('Shorten URL');
        fireEvent.change(originUrlInput, { target: { value: 'https://www.google.com/' } });
        fireEvent.change(aliasInput, { target: { value: 'testcall' } });
        fireEvent.click(shortenButton);
        await waitForLoaderToBeFalse();
    });
});
