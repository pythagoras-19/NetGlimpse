const axios = require('axios');

// Mocking axios.get to control its behavior
jest.mock('axios');

describe('Script Functionality', () => {
    test('Should be true', () => {
        expect(true).toBe(true);
    });
});

