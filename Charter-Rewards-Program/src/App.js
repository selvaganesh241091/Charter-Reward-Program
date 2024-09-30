import React, { useEffect, useState } from 'react';
import CustomerPoints from './components/CustomerPoints/CustomerPoints';
import Spinner from './common/Spinner'; // Import the Spinner componen
import { fetchData } from './utils/fetchData/fetchData';

const App = () => {
    const [state, setState] = useState({
        transactions: [],
        rewards: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData();
            setState(data);
        };

        loadData();
    }, []);

    if (state.loading) {
        return <Spinner />;
    }

    if (state.error) {
        return <div>Error: {state.error}</div>;
    }

    return (
        <div>
            <h1>Customer Reward Program</h1>
            <CustomerPoints rewards={state.rewards} />
        </div>
    );
};

export default App;
