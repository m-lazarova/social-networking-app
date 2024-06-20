import { email, length, required } from "../validators";

describe('validate required', () => {
    const validate = required;

    it('should return false for empty string', () => {
        expect(validate('')).toBe(false);
    });

    it('should return false for string with only whitespace', () => {
        expect(validate('          ')).toBe(false);
    });
    
    it('should return true for regular strings', () => {
        expect(validate('test')).toBe(true);
    });

    it('should return true for strings containing whitespace', () => {
        expect(validate(' this is a test ')).toBe(true);
    });        
})

describe('validate length', () => {
    it('should return false if the value is shorter than min', () => {
        const validate = length({ min: 4 });
        expect(validate('aaa')).toBe(false);
        expect(validate('test')).toBe(true);
    });

    it('should return false if the value is longer than max', () => {
        const validate = length({ max: 4 });
        expect(validate('aaa')).toBe(true);
        expect(validate('testing')).toBe(false);
    });

    it('should return true if the value is within ranges', () => {
        const validate = length({ min: 4, max: 10 });
        expect(validate('aaa')).toBe(false);
        expect(validate('test')).toBe(true);
        expect(validate('testing')).toBe(true);
        expect(validate('testingtest')).toBe(false);
    });

    it('should return true if no ranges are provided', () => {
        const validate = length({ });
        expect(validate('aaa')).toBe(true);
        expect(validate('test')).toBe(true);
        expect(validate('testing')).toBe(true);
        expect(validate('testingtest')).toBe(true);
    });
    
    it('should trim whitespace correctly', () => {
        const validate = length({ min: 4, max: 10 });
        expect(validate('   aaa   ')).toBe(false);
        expect(validate('   test     ')).toBe(true);
        expect(validate('   testing    ')).toBe(true);
        expect(validate('    testing test    ')).toBe(false);
    });
})

describe('validate email', () => {
    it('should return false if invalid email string is provided', () => {
        const validate = email;
        expect(validate('')).toBe(false);
        expect(validate('email.com')).toBe(false);
        expect(validate('email')).toBe(false);
        expect(validate('email@email')).toBe(false);
        expect(validate('email@.com')).toBe(false);
        expect(validate('email@email@.com')).toBe(false);
        expect(validate('email @abc.com')).toBe(false);
        expect(validate('email@')).toBe(false);
    });

    it('should return true for valid emails', () => {
        const validate = email;
        expect(validate('user@email.com')).toBe(true);
        expect(validate('user+1@email.com')).toBe(true);
        expect(validate('user@sub.email.com')).toBe(true);
    })
});