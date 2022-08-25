import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Recipes page tests', () => {
  it('should render all details about a foods recipe correctly', async () => {
    render(<App />);

    const btnSubmit = screen.getByText(/login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);

    const corbaRecipe = await screen.findByText(/corba/i);
    expect(corbaRecipe).toBeInTheDocument();

    userEvent.click(corbaRecipe);
    expect(await screen.findByRole('heading', {
      name: /corba/i })).toBeInTheDocument();

    // });
    // it('should render all details about a drink recipe correctly', async () => {
    //   render(<App />);

    //   const btnSubmit = screen.getByText(/login/i);
    //   const emailInput = screen.getByTestId('email-input');
    //   const passwordInput = screen.getByTestId('password-input');

    //   userEvent.type(emailInput, 'test@test.com');
    //   userEvent.type(passwordInput, '1234567');
    //   expect(btnSubmit).not.toBeDisabled();

    //   userEvent.click(btnSubmit);

    //   const drinksBottom = screen.getByTestId('drinks-bottom-btn');
    //   expect(drinksBottom).toBeInTheDocument();
    //   userEvent.click(drinksBottom);

    //   const drinkRecipe = await screen.findByText(/gg/i);
    //   expect(drinkRecipe).toBeInTheDocument();

  //   userEvent.click(drinkRecipe);
  //   expect(await screen.findByRole('heading', {
  //     name: /gg/i })).toBeInTheDocument();
  });
});
