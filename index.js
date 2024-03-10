const axios = require('axios');
const keypress = require('keypress');

keypress(process.stdin); // make 'process.stdin' begin emitting keypress events
let paused = false;
let delay = 1000; // 1 sec.
(async () => {
    try {
        const url = process.argv[2];
        if (!url) {
            console.error('URL argument is required');
            process.exit(1);
        }

        await fetchAndProcessUrl(url);
    } catch (error) {
        console.error(`\x1b[31mError: ${error.message}\x1b[0m`);

    }
})();

//listen for keypress events
process.stdin.on('keypress', (ch, key) => {
    console.log("got keypress", key);
    if (key) {
        if (key.name === 'space') {
            paused = !paused;
        } else if (key.name === '+' && delay > 100) {
            delay /= 2;
        } else if (key.name === '-' && delay < 8000) {
            delay *= 2;
        }
    }

    if (key && key.ctrl && key.name === 'c') {
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

let currentLine = 0;
let textLines = [];

function printTextResource(text) {
    console.log("print text resource");
    const textLines = text.split('\n');
    printNextLine();
}

function printNextLine() {
    if (paused || currentLine >= textLines.length) return;
    console.log(`${currentLine + 1}: ${textLines[currentLine]}`);
    currentLine++;
    setTimeout(printNextLine, delay);
}

function printNonTextResource(data) {
    //TODO: Finish me -- maybe need offset
    console.log("print non text resource");
}

async function fetchAndProcessUrl(url) {
    console.log("Fetch and processing URL: " + url);
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        //console.log("response: " + response);
        const data = response.data;
        // console.log("response data: " + response.data);
        const contentType = response.headers['content-type'];

        if (/text/.test(contentType)) {
            const text = data.toString('utf8');
            console.log("----------------TEXT--------------------\n");
            console.log(text);
            printTextResource(text);
            console.log("---------------END TEXT------------------\n");
        } else {
            // TODO: FINISH ME
            printNonTextResource(data);
        }
    } catch(error) {
        console.error(`\x1b[31mError: Failed! ${error.message}\x1b[0m`);

    }
}