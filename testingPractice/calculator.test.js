const calculator = require('./calculator')

test('should add 2 plus 3 given 5', () => {
    expect(calculator.add(2,3)).toBe(5);
})



test('should subtract 2 minus 3 given -1', () => {
    expect(calculator.subtract(2,3)).toBe(-1);
})


test('should multiply 2 plus 3 given 6', () => {
    expect(calculator.multiply(2,3)).toBe(6);
})


test('should divide 2 by 5 given 0.4', () => {
    expect(calculator.divide(2,5)).toBe(0.4);
})


test('should throw error on division by 0', () => {
    expect(() => calculator.divide(2,0)).toThrow('Cannot divide by zero');
})