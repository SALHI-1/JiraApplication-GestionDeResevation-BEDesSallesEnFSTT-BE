# Backend API

This is the backend API for the Scrum Management Project (LSI3).

## Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication (JSON Web Tokens)
- **Bcryptjs**: Password hashing
- **Dotenv**: Environment variables management
- **Cors**: Cross-Origin Resource Sharing

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

## Usage

### Development Mode
To run the server in development mode (with nodemon):
```bash
npm run dev
```

### Production Mode
To start the server:
```bash
npm start
```

## API Endpoints

- **Auth & Users**: `/api/users`
- **Rooms (Salles)**: `/api/salles`
- **Slots (Creneaux)**: `/api/creneaux`
- **Reservations**: `/api/reservations`
