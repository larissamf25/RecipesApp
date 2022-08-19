import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header.js';

describe('Testing Main page', () => {
    it('Should render all elements in main page correctly', async () => {
    render(<Header />);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    });
});
