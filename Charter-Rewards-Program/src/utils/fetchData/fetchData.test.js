import { fetchData } from './fetchData';
import { fetchTransactions } from '../fetchTransactions/fetchTransactions';
import { calculateRewards } from '../rewards/rewards';

jest.mock('../fetchTransactions/fetchTransactions');
jest.mock('../rewards/rewards');

describe('fetchData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch transactions and calculate rewards successfully', async () => {
        const mockTransactions = [{ id: 1, amount: 100 }];
        const mockRewards = [{ id: 1, points: 50 }];

        fetchTransactions.mockResolvedValue(mockTransactions);
        calculateRewards.mockReturnValue(mockRewards);

        const result = await fetchData();

        expect(fetchTransactions).toHaveBeenCalledTimes(1);
        expect(calculateRewards).toHaveBeenCalledWith(mockTransactions);
        expect(result).toEqual({
            transactions: mockTransactions,
            rewards: mockRewards,
            loading: false,
            error: null,
        });
    });

    it('should handle error during data fetch', async () => {
        const mockError = new Error('Fetch failed');

        fetchTransactions.mockRejectedValue(mockError);

        const result = await fetchData();

        expect(fetchTransactions).toHaveBeenCalledTimes(1);
        expect(calculateRewards).not.toHaveBeenCalled();
        expect(result).toEqual({
            transactions: [],
            rewards: [],
            loading: false,
            error: mockError.message,
        });
    });
});