import React from 'react';
import { render } from '@testing-library/react';
import CustomerPoints from './CustomerPoints';

test('renders rewards table correctly', () => {
    const rewards = [
        { name: 'John Doe', month: 'January', points: 90 },
        { name: 'John Doe bob', month: 'Total', points: 80 },
    ];
    const { getByText } = render(<CustomerPoints rewards={rewards} />);
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('90')).toBeInTheDocument();
});
