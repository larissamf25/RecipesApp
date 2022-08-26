import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import saveLocalStore from '../pages/helpers/saveLocalStore';

const corba = [[{ id: '52977', type: 'food', nationality: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }]];

async function login() {
  renderWithRouter(<App />);
  saveLocalStore('favoriteRecipes', corba);
  userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
  userEvent.type(screen.getByTestId('password-input'), '12345678');
  userEvent.click(screen.getByTestId('login-submit-btn'));
  userEvent.click(screen.getByTestId('profile-top-btn'));
  userEvent.click(screen.getByTestId('profile-favorite-btn'));
}

describe('FavoriteRecipes page tests', () => {
  test('Should render all elements in FavoriteRecipes correctly', async () => {
    await login();

    expect(window.localStorage.getItem('favoriteRecipes')).toBeDefined();
    const horizontalImg = await screen.findByTestId('0-horizontal-name');
    expect(horizontalImg).toBeDefined();

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    const foodBtn = await screen.findByTestId('filter-by-food-btn');
    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

    userEvent.click(allBtn);
    userEvent.click(foodBtn);
    userEvent.click(drinkBtn);
    userEvent.click(shareBtn);
  });
});
