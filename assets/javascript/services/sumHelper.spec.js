const sumHelper = require('./sumHelper');

describe('test', function () {
    it('works', function () {
        expect(sumHelper).toBeDefined();
    });
    
    it('transpiles', function () {
        const name = 'mark';
        const greeting = `Hello from ${name}`;
        expect(greeting).toBe('Hello from mark');
    });
});
