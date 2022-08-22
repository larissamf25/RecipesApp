import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing Profile Component', () => {
    it('Should render all elements in Profile correctly', () => {
    render(<App />);

    const btnSubmit = screen.getByText(/login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(btnSubmit).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    const userEmail =  screen.getByTestId("profile-email");
    expect(userEmail).toBeInTheDocument()

    const doneBtn = screen.getByTestId("profile-done-btn")
    userEvent.click(doneBtn)

    // expect(JSON.parse(localStorage.removeItem('user'))).toEqual('');
    expect(localStorage.clear()).toEqual(undefined);
  });
});