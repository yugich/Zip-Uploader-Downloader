# ZIP File Upload Server

This project is a simple Node.js server that allows users to upload ZIP files through a web interface. It stores the files on the server and provides endpoints to retrieve the latest uploaded file based on versioning in the file name.

## Features

- Upload ZIP files to the server.
- Automatically store files with their original names.
- Retrieve the latest version of a ZIP file based on its filename.
- Simple web interface for file uploads.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/zip-upload-server.git
   cd zip-upload-server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

## Running the Server

To start the server, run:

```bash
node server.js
```

The server will start on port 3000 by default. You can access it in your browser at `http://localhost:3000`.

## Endpoints

- `POST /upload` - Upload a ZIP file to the server.
  - Expects a `file` field in the form data.
  - Returns a JSON response with a success message and file details.

- `GET /storage` - Retrieve the latest uploaded ZIP file.

- `GET /latest-version` - Get the name of the latest version of the uploaded ZIP files.

## File Structure

- `server.js`: The main server file containing the Express.js setup and endpoints.
- `public/index.html`: The front-end HTML page for uploading files.
- `uploads/`: Directory where uploaded files are stored.

## Usage

1. Open `http://localhost:3000` in your web browser.
2. Use the web interface to upload a ZIP file.
3. The page will display the latest version of the uploaded file.
4. Use the `/storage` endpoint to download the latest version.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bug reports or feature requests.