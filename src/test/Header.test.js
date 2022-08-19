import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testing Main page', () => {
  it('Should render all elements in main page correctly', async () => {
    render(<App />);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});
