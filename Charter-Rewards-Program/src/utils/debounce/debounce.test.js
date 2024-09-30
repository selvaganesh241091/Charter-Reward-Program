// src/utils/debounce.test.js
import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
    let mockFunction;

    beforeEach(() => {
        mockFunction = jest.fn();
    });

    test('calls the function after the specified delay', () => {
        const debouncedFunction = debounce(mockFunction, 200);
        debouncedFunction();
        expect(mockFunction).not.toBeCalled();
        jest.advanceTimersByTime(200);
        expect(mockFunction).toBeCalled();
    });

    test('does not call the function immediately', () => {
        const debouncedFunction = debounce(mockFunction, 200);
        debouncedFunction();
        expect(mockFunction).not.toBeCalled();
    });

    test('calls the function only once when invoked multiple times within the delay period', () => {
        const debouncedFunction = debounce(mockFunction, 200);
        debouncedFunction();
        debouncedFunction();
        debouncedFunction();
        jest.advanceTimersByTime(200);
        expect(mockFunction).toHaveBeenCalledTimes(1);
    });

    test('calls the function with the correct arguments', () => {
        const debouncedFunction = debounce(mockFunction, 200);
        debouncedFunction('arg1', 'arg2');
        jest.advanceTimersByTime(200);
        expect(mockFunction).toHaveBeenCalledWith('arg1', 'arg2');
    });
});
