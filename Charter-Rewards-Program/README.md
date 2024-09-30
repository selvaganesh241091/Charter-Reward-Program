# Customer Rewards Program

This project calculates reward points for customers based on their transactions.

## Installation

1. Clone the repository.
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the local server:
    ```sh
    node server.js
    ```
4. Start the React application:
    ```sh
    npm start
    ```

## Usage

The application fetches transaction data from a local server and calculates reward points for each customer per month and total.

## Components

### CustomerPoints

Displays the reward points for each customer.

#### Props

- `rewards` (Array): Array of reward objects.

## Utils

### calculatePoints

Calculates reward points based on the amount spent.

#### Parameters

- `amount` (number): Amount spent in the transaction.

#### Returns

- `number`: Reward points earned.

## Testing

Run unit tests using Jest:
```sh
npm test