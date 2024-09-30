// src/utils/fetchTransactions.js
import { TRANSACTION_API } from '../../constants/index'; // Adjust the import path as needed

export const transactionService = async () => {
    try {
        const response = await fetch(`${TRANSACTION_API}`);

        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};
