import { calculatePoints } from '../calculate/calculatePoints';

export const calculateRewards = (transactions) => {
    const rewardsMap = transactions.reduce((acc, { customerId, name, amount, date }) => {
        const month = new Date(date).toLocaleString('default', { month: 'long' });
        const points = calculatePoints(amount);

        if (!acc[customerId]) {
            acc[customerId] = { name, monthlyPoints: {}, totalPoints: 0, totalAmount: 0 };
        }

        if (!acc[customerId].monthlyPoints[month]) {
            acc[customerId].monthlyPoints[month] = { points: 0, amount: 0 };
        }

        acc[customerId].monthlyPoints[month].points += points;
        acc[customerId].monthlyPoints[month].amount += amount;
        acc[customerId].totalPoints += points;
        acc[customerId].totalAmount += amount;

        return acc;
    }, {});

    const rewardsArray = Object.values(rewardsMap).flatMap(({ name, monthlyPoints, totalPoints, totalAmount }) => {
        const monthlyRewards = Object.entries(monthlyPoints).map(([month, { points, amount }]) => ({
            name,
            month,
            points,
            amount,
        }));
        return [...monthlyRewards, { name, month: 'Total', points: totalPoints, amount: totalAmount }];
    });

    return rewardsArray;
};