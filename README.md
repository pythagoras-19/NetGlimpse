<p align="center">
  <img src="./NetGlimpse_logo.jpeg" width="100"/>
</p>
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

## Developer Instructions
1. Clone the repository.
```bash
git clone https://github.com/pythagoras-19/NetGlimpse.git
```
2. Navigate to the project directory.
```bash 
cd NetGlimpse
```
3. Install dependencies.
```bash 
npm install
```
4. Run NetGlimpse locally with a specified URL.
```bash 
npm start <URL>
```
# Running in Docker
- Install Docker on your machine at [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).
- `username` is your Docker Hub username.
1. Build the Docker image.
```bash
docker build -t <username>/netglimpse .
```
2. Run the Docker container.
```bash
docker run -it -p 3000:3000 -e URL=<URL> <username>/netglimpse
```
- The `-p` flag maps the container's port 3000 to the host's port 3000.
- The `-e` flag sets the environment variable `URL` to the specified URL.
- The `-it` flag runs the container in interactive mode so **NetGlimpse** can interact with real time user inputs.


