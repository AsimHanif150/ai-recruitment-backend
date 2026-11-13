# AI Recruitment Platform: Backend

REST API for an AI-driven, multi-role hiring platform. It handles authentication, job postings, candidate profiles, and job applications.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT, with passwords hashed using bcrypt
- **Dev tools:** nodemon, dotenv

## Features

- User registration and login with role-based accounts
- JWT-protected routes
- Job posting and management
- Candidate profiles
- Job applications

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/AsimHanif150/ai-recruitment-backend.git
cd ai-recruitment-backend
npm install
```

### Environment Variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

```dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

### Run

```bash
npm run dev     # development with nodemon
npm start       # production
```

The server runs at `http://localhost:5000`.

## API Overview

| Route group | Purpose |
|---|---|
| `/api/auth` | Register and log in |
| `/api/users` | User management |
| `/api/candidates` | Candidate profiles |
| `/api/jobs` | Create and browse jobs |
| `/api/applications` | Apply to jobs and track applications |

## Project Structure

```
controllers/   Request handlers and business logic
models/        Mongoose schemas
routes/        Route definitions
middleware/    Auth and other middleware
utils/         Helpers (e.g. token generation)
server.js      App entry point
```

## Author

**Asim Hanif**
[LinkedIn](https://linkedin.com/in/asim-hanif-88a430251) · [GitHub](https://github.com/AsimHanif150)

## License

MIT
