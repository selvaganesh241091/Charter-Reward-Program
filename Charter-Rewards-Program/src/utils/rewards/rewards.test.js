// src/utils/rewards/rewards.test.js
import { calculateRewards } from "./rewards";
import { calculatePoints } from "../calculate/calculatePoints";

jest.mock("../calculate/calculatePoints");

describe("calculateRewards", () => {
  beforeEach(() => {
    calculatePoints.mockClear();
  });

  test("calculates rewards correctly for a single transaction", () => {
    calculatePoints.mockReturnValue(50);
    const transactions = [
      { customerId: 1, name: "John Doe", amount: 100, date: "2023-01-15" },
    ];
    const result = calculateRewards(transactions);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 100,
          "month": "January",
          "name": "John Doe",
          "points": 50,
        },
        Object {
          "amount": 100,
          "month": "Total",
          "name": "John Doe",
          "points": 50,
        },
      ]
    `);
  });

  test("calculates rewards correctly for multiple transactions for the same customer in the same month", () => {
    calculatePoints.mockReturnValueOnce(10).mockReturnValueOnce(20);
    const transactions = [
      { customerId: 1, name: "John Doe", amount: 100, date: "2023-01-15" },
      { customerId: 1, name: "John Doe", amount: 200, date: "2023-01-20" },
    ];
    const result = calculateRewards(transactions);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 300,
          "month": "January",
          "name": "John Doe",
          "points": 30,
        },
        Object {
          "amount": 300,
          "month": "Total",
          "name": "John Doe",
          "points": 30,
        },
      ]
    `);
  });

  test("calculates rewards correctly for multiple customers", () => {
    calculatePoints.mockReturnValue(10);
    const transactions = [
      { customerId: 1, name: "John Doe", amount: 100, date: "2023-01-15" },
      { customerId: 2, name: "Jane Smith", amount: 100, date: "2023-01-15" },
    ];
    const result = calculateRewards(transactions);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 100,
          "month": "January",
          "name": "John Doe",
          "points": 10,
        },
        Object {
          "amount": 100,
          "month": "Total",
          "name": "John Doe",
          "points": 10,
        },
        Object {
          "amount": 100,
          "month": "January",
          "name": "Jane Smith",
          "points": 10,
        },
        Object {
          "amount": 100,
          "month": "Total",
          "name": "Jane Smith",
          "points": 10,
        },
      ]
    `);
  });

  test("handles an empty transactions array", () => {
    const transactions = [];
    const result = calculateRewards(transactions);
    expect(result).toEqual([]);
  });
});
