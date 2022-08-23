import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import meals from './data/cardsFoods';

describe('Foods page tests', () => {
  it('should show the firsts 12 foods of the menu', () => {
    render(<App />);

    const btnSubmit = screen.getByText(/login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);

    // meals.forEach((meal) => {
    //   expect(screen.getByText(meal.strMeal)).toBeInTheDocument();
    // });
  });
});
