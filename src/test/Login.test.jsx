import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Login', () => {
  test('Verifica se existem dois inputs e um botão na tela de login', () => {
    render(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const btnSubmit = screen.getByText(/login/i);
    expect(btnSubmit).toBeInTheDocument();
  });
  test(`Verifica se o botão é habilitado somente após
    os inputs serem preenchidos de forma correta`, () => {
    render(<App />);

    const btnSubmit = screen.getByText(/login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(btnSubmit).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
});
