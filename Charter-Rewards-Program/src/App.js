import React, { useEffect, useState } from 'react';
import CustomerPoints from './components/CustomerPoints/CustomerPoints';
import { calculateRewards } from './utils/rewards/rewards'; // Import the calculateRewards function
import Spinner from './common/Spinner'; // Import the Spinner componen
import { fetchTransactions } from './utils/fetchTransactions/fetchTransactions'; // Import the fetchTransactions function

const App = () => {
    const [state, setState] = useState({
        transactions: [],
        rewards: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactions = await fetchTransactions();
                const rewards = calculateRewards(transactions);
                setState({
                    transactions,
                    rewards,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                setState({
                    transactions: [],
                    rewards: [],
                    loading: false,
                    error: error.message,
                });
            }
        };

        fetchData();
    }, []);

    if (state.loading) {
        return <Spinner />;
    }

    if (state.error) {
        return <div>Error: {state.error}</div>;
    }

    return (
        <div>
            <h1>Customer Rewards</h1>
            <CustomerPoints rewards={state.rewards} />
        </div>
    );
};

export default App;