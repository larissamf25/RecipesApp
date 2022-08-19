import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Main page', () => {
  it('Should render all elements in main page correctly', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('foods');
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
    const pageTitle = screen.getByText(/Foods/i);
    // const profileIcon = screen.getByTestId('profile-top-btn');
    // const searchIcon = screen.getByTestId('search-top-btn');
    // const pageTitle = screen.getByTestId('page-title');

    // expect(profileIcon).toBeInTheDocument();
    // expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});
