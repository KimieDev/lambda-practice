const { test } = require('./script');

describe('init', () => {
    it('test', () => {
        expect(test()).toBe(true);
    })
})