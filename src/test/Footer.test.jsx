import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing Footer Component', () => {
  it('Should render all elements in Footer correctly', () => {
    render(<App />);

    const btnSubmit = screen.getByText(/login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(btnSubmit).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);

    const footerID = screen.getByTestId('footer');
    const drinksBottom = screen.getByTestId('drinks-bottom-btn');
    const foodBottom = screen.getByTestId('food-bottom-btn');

    expect(footerID).toBeInTheDocument();
    expect(drinksBottom).toBeInTheDocument();
    expect(foodBottom).toBeInTheDocument();

    userEvent.click(drinksBottom);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    userEvent.click(foodBottom);
  });
});
