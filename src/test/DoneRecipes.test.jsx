import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import saveLocalStore from '../pages/helpers/saveLocalStore';

const corba = [{ id: '52977', type: 'food', nationality: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', doneDate: '25/8/2022', tags: ['Soup'] }];

async function login() {
  renderWithRouter(<App />);
  saveLocalStore('doneRecipes', corba);
  userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
  userEvent.type(screen.getByTestId('password-input'), '12345678');
  userEvent.click(screen.getByTestId('login-submit-btn'));
  userEvent.click(screen.getByTestId('profile-top-btn'));
  userEvent.click(screen.getByTestId('profile-done-btn'));
}

describe('DoneRecipes page tests', () => {
  test('Should render all elements in DoneRecipes correctly', async () => {
    await login();

    expect(window.localStorage.getItem('doneRecipes')).toBeDefined();
    const horizontalImg = await screen.findByText('Soup');
    expect(horizontalImg).toBeDefined();

    const data = await screen.findByText('25/8/2022');
    expect(data).toBeInTheDocument();

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    const foodBtn = await screen.findByTestId('filter-by-food-btn');
    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

    userEvent.click(allBtn);
    userEvent.click(foodBtn);
    userEvent.click(drinkBtn);
    userEvent.click(shareBtn);

    // expect(await screen.findByText('Link copied!')).toBeDefined();
  });
});
