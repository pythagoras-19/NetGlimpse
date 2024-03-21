const axios = require('axios');
const { fetchAndProcessUrl } = require('../index');

jest.mock('axios');

describe('fetchAndProcessUrl', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        axios.get.mockClear();
        axios.get.mockResolvedValue({ data: 'mockData', headers: {'content-type': 'text/plain'} });
    });

    test('axios.get is called with the correct URL', async () => {
        const url = 'https://www.gutenberg.org/cache/epub/2701/pg2701.txt';

        await fetchAndProcessUrl(url);

        jest.runAllTimers();

        expect(axios.get).toHaveBeenCalledWith(url, { responseType: 'arraybuffer' });
    });

});
