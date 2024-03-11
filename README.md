<h1 align="center">NetGlimpse</h1>

## Overview

NetGlimpse is a command-line utility designed to fetch and display the content from a specified URL directly to your terminal. This tool is tailored for developers, system administrators, or any tech enthusiasts who require a straightforward, interactive way to preview the content of web resources in real-time.

## Features

- **Text Display**: If the URL points to a text resource, NetGlimpse prints the content line by line to the standard output, with each line preceded by its line number. The output is paced at one line per second, providing a controlled read-out of the entire text content.

- **Non-Text Display**: For non-text resources (like binary files), the program displays the content in a hexadecimal format, similar to the output of the Linux command `od -t x1`. It prints 16 bytes per line, each byte separated by a space, and precedes each line with the file offset in hexadecimal. This output is also paced at one line per second.

- **Interactive Speed Control**: Users can interact with the ongoing display using the keyboard:
    - Pressing the "q" key increases the speed of the display.
    - Pressing the "s" key decreases the speed of the display.
    - Pressing the spacebar pauses the display; pressing it again resumes the display.

- **Immediate Response**: The program is designed to respond immediately to key presses, ensuring a smooth and responsive user experience even while the data is being printed.

- **Concurrency Model**: NetGlimpse operates under a non-threaded model, ensuring that it manages its I/O and user interactions within a single thread, following best practices for asynchronous programming.

## Usage

- Use `q` to quicken the pace of the processing.
- Use `s` to slow the pace of the processing.

## Resources

1. Plain text files used: [https://www.gutenberg.org/cache/epub/2701/pg2701.txt](https://www.gutenberg.org/cache/epub/2701/pg2701.txt)
2. Non-text file used: [https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png](https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png)
