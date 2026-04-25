# TASPEF Server

Node.js + Express + MongoDB backend for TASPEF.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Project Structure

```
src/
├── config/         # Configuration files
├── models/         # Mongoose models
├── controllers/    # Route controllers
├── routes/         # API routes
├── middleware/     # Custom middleware
└── index.js        # Entry point
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taspef
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
CLIENT_URL=http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/files` | Upload file |
| GET | `/api/files` | List files |
| GET | `/api/files/:id` | Get file metadata |
| GET | `/api/files/:id/download` | Download file |
| DELETE | `/api/files/:id` | Delete file |

## Technologies

- Node.js 18+
- Express 4.18.2
- MongoDB with Mongoose 8.0.3
- Multer 1.4.5
- Helmet 7.1.0
- CORS 2.8.5

## Documentation

See [main README](../README.md) for full documentation.

