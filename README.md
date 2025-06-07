# Event Countdown Timer

This project provides a simple Node.js backend with a React frontend for creating events and sharing countdown pages.

## Features

- Create an event with a title, description and target date/time.
- Receive a unique link that displays a live countdown to the event.
- Responsive frontend built with React and Vite.
- Data stored in a SQLite database for persistence.
- Docker setup for easy deployment.

## Running locally with Docker

1. Build and start the container:
   ```bash
   docker compose up --build
   ```

2. Visit `http://localhost:3000` in your browser.

The SQLite database is stored in a Docker volume so your events persist across container restarts.

## Development without Docker

1. Install dependencies for both the server and client:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
2. Build the frontend and start the server:
   ```bash
   cd ../client && npm run build
   cd ../server && npm start
   ```
3. The application will be available at `http://localhost:3000`.

## Project Structure

- `server/` – Express backend and SQLite database
- `client/` – React frontend (built with Vite)
- `docker-compose.yml` and `Dockerfile` – Docker configuration

