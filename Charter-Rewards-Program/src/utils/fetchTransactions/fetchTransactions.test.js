// src/App.test.js
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './../../App';
import { fetchTransactions } from '../fetchTransactions/fetchTransactions';
import { calculateRewards } from '../rewards/rewards';

jest.mock('../fetchTransactions/fetchTransactions');
jest.mock('../rewards/rewards');

describe('App Component', () => {
    beforeEach(() => {
        fetchTransactions.mockClear();
        calculateRewards.mockClear();
    });

    test('displays loading spinner initially', () => {
        render(<App />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('displays customer points after successful data fetch', async () => {
        const mockTransactions = [{ id: 1, amount: 100 }];
        const mockRewards = [{ name: 'John Doe', month: 'January', points: 10 }];
        fetchTransactions.mockResolvedValueOnce(mockTransactions);
        calculateRewards.mockReturnValueOnce(mockRewards);

        await act(async () => {
            render(<App />);
        });

        await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
        expect(screen.getByText('January')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        fetchTransactions.mockRejectedValueOnce(new Error('Failed to fetch transactions'));

        await act(async () => {
            render(<App />);
        });

        await waitFor(() => expect(screen.getByText('Error: Failed to fetch transactions')).toBeInTheDocument());
    });
});
