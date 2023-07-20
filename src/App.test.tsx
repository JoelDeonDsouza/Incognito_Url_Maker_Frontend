import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'; // Import the extended matchers

test('renders learn react link', () => {
  render(<App />);
});
