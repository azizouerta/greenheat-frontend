# GreenHeat Frontend

This is the frontend application for **GreenHeat**, a community-owned energy company that provides weather data for district heating optimization.

## Features

- Displays current weather data and forecasts.
- Interactive charts for temperature, humidity, windspeed, and more.
- Option to select the number of days for which weather data should be shown.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- npm (comes with Node.js) or [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Docker](https://docs.docker.com/get-docker/) (if using Docker)

## Setup & Installation

### 1. Clone the repository
git clone https://github.com/azizouerta/greenheat-frontend.git
cd greenheat-frontend

### 2. Install dependencies
npm install

### 3. Create .env file
REACT_APP_API_URL=http://localhost:5000

### 4. Run the app locally
npm start

## Docker Instructions
### 1. Build the Docker image
docker build -t greenheat-frontend .

### 2. Run the Docker container
docker run -d -p 3000:3000 greenheat-frontend

### Using Docker Compose
You can also use Docker Compose to start both the frontend and backend services together. You will need a docker-compose.yml file that defines both services (frontend and backend).
### docker-compose up --build

