import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './CustomerPoints.css';
import { debounce } from '../../utils/debounce/debounce';

const CustomerPoints = ({ rewards }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useMemo(
        () => debounce((event) => {
            setSearchTerm(event.target.value);
        }, 300),
        []
    );

    const filteredRewards = rewards.filter((reward) =>
        reward.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
           <input
                type="text"
                placeholder="Search by customer name"
                onChange={handleSearch}
                className="material-input"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                {filteredRewards.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="no-results">No results found</td>
                        </tr>
                    ) : (
                        filteredRewards.map((reward, index) => (
                            <tr key={index} className={reward.month === 'Total' ? 'highlight' : ''}>
                                <td>{reward.name}</td>
                                <td>{reward.month}</td>
                                <td>{reward.amount}</td>
                                <td>{reward.points}</td>
                            </tr>
                        ))
                    )}
            </tbody>
            </table>
        </>
    );
};

CustomerPoints.propTypes = {
    rewards: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            month: PropTypes.string.isRequired,
            points: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default CustomerPoints;
