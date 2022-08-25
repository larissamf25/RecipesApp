import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  delete window.location;
  window.location = new URL('http://localhost/');
});

async function login() {
  renderWithRouter(<App />);
  userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
  userEvent.type(screen.getByTestId('password-input'), '12345678');
  userEvent.click(screen.getByTestId('login-submit-btn'));
}

describe('Recipes page tests', () => {
  it('should render all details about a foods recipe correctly', async () => {
    await login();

    const corbaRecipe = await screen.findByText(/corba/i);
    expect(corbaRecipe).toBeInTheDocument();

    userEvent.click(corbaRecipe);

    expect(await screen.findByRole('heading', {
      name: /corba/i })).toBeInTheDocument();
  });
  it('should render all details about a drink recipe correctly', async () => {
    await login();

    const drinksBottom = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBottom).toBeInTheDocument();

    userEvent.click(drinksBottom);

    const drinkRecipe = await screen.findByText(/gg/i);
    expect(drinkRecipe).toBeInTheDocument();

    userEvent.click(drinkRecipe);

    expect(await screen.findByRole('heading', {
      name: /gg/i })).toBeInTheDocument();
  });
});
