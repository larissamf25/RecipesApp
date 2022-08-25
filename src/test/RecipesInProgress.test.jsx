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

describe('RecipesInProgress page tests', () => {
  test('Should render all elements in RecipesInProgress correctly', async () => {
    await login();
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeDefined();
    userEvent.click(drinksBtn);
    const click = await screen.findByTestId('0-card-img');
    userEvent.click(click);
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startRecipe);

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();

    const ingredient1 = await screen.findByTestId('0-ingredient-input');
    const ingredient2 = await screen.findByTestId('1-ingredient-input');
    const ingredient3 = await screen.findByTestId('2-ingredient-input');
    expect(ingredient1).toBeDefined();
    userEvent.click(ingredient1);
    expect(ingredient2).toBeDefined();
    userEvent.click(ingredient2);
    expect(ingredient3).toBeDefined();
    userEvent.click(ingredient3);
    expect(window.localStorage.getItem('inProgressRecipes'))
      .toBe('{"cocktails":{"15997":[1,2,3]},"meals":{}}');
    expect(await screen.findByTestId('finish-recipe-btn')).not.toBeDisabled();
    userEvent.click(finishBtn);
    // expect(window.localStorage.getItem('doneRecipes')).toBeNull();
    // const allBtn = await screen.findByTestId('filter-by-all-btn');
    // expect(allBtn).toBeDefined();
  });
});

// testIds.forEach(async (e) => {
//   const localE = await screen.findByTestId(e);
//   expect(localE).toBeDefined();
// });
