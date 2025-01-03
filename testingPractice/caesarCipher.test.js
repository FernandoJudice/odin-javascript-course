const caesarCipher = require("./caesarCipher")

test('Should execute happy path', () => {
    expect(caesarCipher('abc',1)).toBe('bcd')
})


test('Should wrap around end of alphabet', () => {
    expect(caesarCipher('xyz',3)).toBe('abc')
})

test('Should wrap around start of alphabet on negative shift', () => {
    expect(caesarCipher('abc',-3)).toBe('xyz')
})


test('Should preserve case', () => {
    expect(caesarCipher('HeLLo',3)).toBe('KhOOr')
})


test('Should preserve punctuation', () => {
    expect(caesarCipher('Hello, World!',3)).toBe('Khoor, Zruog!')
})