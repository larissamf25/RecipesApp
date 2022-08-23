import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing Profile Component', () => {
  global.alert = jest.fn();
  it('Should render all elements in Profile correctly', async () => {
    render(<App />);

    const btnSubmit = screen.getByText(/login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(btnSubmit).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);

    const corba = await screen.findByText(/corba/i);
    expect(corba).toBeInTheDocument();

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beefBtn);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    const ingredientInput = screen.getByText(/ingredient/i);
    userEvent.type(searchBar, '1');
    userEvent.click(ingredientInput);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    global.alert.mockClear();
  });
});
