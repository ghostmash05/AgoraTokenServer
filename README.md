# Agora Token Generation Server Using NodeJs

A simple Express.js server that generates tokens for Agora.io Real-Time Communication (RTC) applications.

## Overview

This server provides a REST API endpoint that generates tokens required for authenticating users in Agora RTC applications. It supports both publisher and subscriber roles.

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- Agora.io account with App ID and App Certificate

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AgoraTokenServer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Agora credentials:
```env
APP_ID='your-app-id'
APP_CERTIFICATE='your-app-certificate'
```

## Usage

1. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

2. Generate a token by making a GET request to:
```
http://localhost:3000/generate-token?channelName=<CHANNEL>&uid=<USER_ID>&role=<ROLE>
```

### Query Parameters

- `channelName`: The name of the channel to join (required)
- `uid`: User ID (required)
- `role`: Either 'publisher' or 'subscriber' (required)

### Example Request

```
GET http://localhost:3000/generate-token?channelName=test&uid=1234&role=publisher
```

### Response

```json
{
    "token": "generated-token-string"
}
```

## Features

- Token generation for Agora RTC
- Support for publisher and subscriber roles
- CORS enabled
- No-cache headers
- 1-hour token expiration

## Security Notes

- Keep your App ID and App Certificate secure
- The `.env` file is included in `.gitignore` to prevent credential exposure
- CORS is enabled for all origins (`*`)

## License
