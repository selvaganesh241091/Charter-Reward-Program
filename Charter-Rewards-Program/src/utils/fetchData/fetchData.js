// src/utils/fetchData.js
import { transactionService } from '../../services/transactionService/transactionService';
import { calculateRewards } from '../rewards/rewards';

export const fetchData = async () => {
    try {
        const transactions = await transactionService();
        const rewards = calculateRewards(transactions);
        return {
            transactions,
            rewards,
            loading: false,
            error: null,
        };
    } catch (error) {
        return {
            transactions: [],
            rewards: [],
            loading: false,
            error: error.message,
        };
    }
};