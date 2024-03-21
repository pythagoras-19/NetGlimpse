const axios = require('axios');
const keypress = require('keypress');

keypress(process.stdin);

let paused = false;
let delay = 1000; // 1 sec.

(async () => {
    try {
        const url = process.argv[2];
        if (!url) {
            console.error('ERROR: URL argument is required\nUSAGE: npm start <URL>');
            process.exit(1);
        }

        await fetchAndProcessUrl(url);
    } catch (error) {
        console.error(`\x1b[31mError: ${error.message}\x1b[0m`);

    }
})();

process.stdin.on('keypress', (ch, key) => {
    if (key) {
        if (key.name === 'space') {
            paused = !paused;
            if(!paused) {
                printNextLine();
            }
        } else if (key && key.name === 'q' && delay > 50) {
            delay /= 2;
        } else if (key && key.name === 's' && delay < 8000) {
            delay *= 2;
        }
    }

    if (key && key.ctrl && key.name === 'c') {
        process.exit();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

let currentLine = 0;
let textLines = [];

function printTextResource(text) {
    textLines = text.split('\n');
    printNextLine();
}

function printNextLine() {
    if (paused || currentLine >= textLines.length) {
        return;
    }
    setTimeout(() => {
        try {
            console.log(`${currentLine + 1}: ${textLines[currentLine]}`);
            currentLine++;
            printNextLine();
        } catch (error) {
            console.error("An error occurred! :", error);
        }
    }, delay);
}

function printNonTextResource(data, offset = 0) {
    if (offset >= data.length) {
        return;
    }

    if (paused) {
        // wait for unpause
        setTimeout(() => printNonTextResource(data, offset), delay);
    } else {
        // Process data
        setTimeout(() => {
            try {
                let line = Array.from(new Uint8Array(data.slice(offset, offset + 16)));
                let hexLine = line.map(byte => byte.toString(16).padStart(2, '0')).join(' ');
                console.log(`${offset.toString(16).padStart(8, '0')}  ${hexLine}`);
                printNonTextResource(data, offset + 16);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }, delay);
    }
}


async function fetchAndProcessUrl(url) {
    console.log("Fetch and processing URL: " + url);
    try {
        const response = await axios.get(url, {responseType: 'arraybuffer'});
        const data = response.data;
        const contentType = response.headers['content-type'];

        if (/text/.test(contentType)) {
            const text = data.toString();
            printTextResource(text);
        } else {
            printNonTextResource(data);
        }
    } catch (error) {
        console.error(`\x1b[31mError: Failed! ${error.message}\x1b[0m`);
    }
}
