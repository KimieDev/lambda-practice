const { validateEmail } = require('./utils');

describe('ValidateEmail', () => {
    it('should return false when there is no argument', () => {
        expect(validateEmail()).toBe(false);
    })

    it('should return false when an empty string is given', () => {
        expect(validateEmail('')).toBe(false);
    })

    it('should return false when given email has incorrect format', () => {
        const email1 = 'test@@gmail..com';
        const email2 = 'test@$$gmail..co.uk';
        expect(validateEmail(email1)).toBe(false);
        expect(validateEmail(email2)).toBe(false);
    })

    it('should return true when given email is correct', () => {
        const email1 = 'test@gmail.com';
        const email2 = 'test@gmail.co.uk';
        const email3 = 'test@gmail.co.kr';
        expect(validateEmail(email1)).toBe(true);
        expect(validateEmail(email2)).toBe(true);
        expect(validateEmail(email3)).toBe(true);

    })
})