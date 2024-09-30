/**
 * Calculate reward points based on the amount spent with memoization.
 * @param {number} amount - Amount spent in the transaction.
 * @returns {number} - Reward points earned.
 */
const calculatePoints = (() => {
    const cache = {};

    return (amount) => {
        if (cache[amount] !== undefined) {
            return cache[amount];
        }

        let points = 0;
        if (amount > 100) {
            points += (amount - 100) * 2;
            amount = 100;
        }
        if (amount > 50) {
            points += (amount - 50) * 1;
        }

        cache[amount] = points;
        return points;
    };
})();

export { calculatePoints };
