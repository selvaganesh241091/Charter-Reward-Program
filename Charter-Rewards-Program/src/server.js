const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

const transactions = [
    { customerId: 1, name: 'John Doe', amount: 120, date: '2023-01-15' },
    { customerId: 1, name: 'John Doe', amount: 75, date: '2023-02-15' },
    { customerId: 1, name: 'John Doe', amount: 200, date: '2023-03-15' },
    { customerId: 2, name: 'Jane Smith', amount: 50, date: '2023-01-15' },
    { customerId: 2, name: 'Jane Smith', amount: 150, date: '2023-02-15' },
    { customerId: 2, name: 'Jane Smith', amount: 90, date: '2023-03-15' },
];

app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});