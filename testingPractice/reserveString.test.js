const reverseString = require("./reverseString")

test('should reverse london to nodnol', () => {
    expect(reverseString('london')).toBe('nodnol')
})

test('should reverse Car12 to 21raC', () => {
    expect(reverseString('Car12')).toBe('21raC')
})