const axios = require('axios');
const keypress = require('keypress');

keypress(process.stdin); // make 'process.stdin' begin emitting keypress events

//listen for keypress events
process.stdin.on('keypress', (ch, key) => {
    console.log("got keypress", key);
    if (key && key.ctrl && key.name === 'c') {
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

let delay = 1000; // 1 sec.
function printTextResource(line) {
    //TODO: FINISH ME
    const lineSplit = line.split('\n');
    console.log("print text resource");
}

function printNonTextResource(data, offset) {
    //TODO: Finish me
    console.log("print non text resource");
}

async function fetchAndProcessUrl(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'];

        if (/text/.test(contentType)) {
            // TODO: Handle text resource
            printTextResource()
        } else {
            // TODO: Handle non-text resource
        }
    } catch {
        console.error(`Failed to fetch the URL: ${error.message}`);
    }
}