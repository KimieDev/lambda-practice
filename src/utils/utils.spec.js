const { validateEmail, validatedStatus } = require('./utils');

describe('Utils', () => {

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

    describe('validatedStatus', () => {
        it('should return pending when given argument is undefined', () => {
            const status = undefined;
            expect(validatedStatus(status)).toBe('pending');
        })

        it('should return pending when given argument is an empty string', () => {
            const status = '';
            expect(validatedStatus(status)).toBe('pending');
        })

        it('should return passed argument when given argument are one of the followings: active, unsubscribe, pending', () => {
            const status = 'active';
            const status2 = 'unsubscribe';
            const status3 = 'pending';
            expect(validatedStatus(status)).toBe(status);
            expect(validatedStatus(status2)).toBe(status2);
            expect(validatedStatus(status3)).toBe(status3);

        })
    
    })
    
})
