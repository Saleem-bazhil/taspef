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

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Copy environment file
cp .env.example .env

# Build and start services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### Using Docker Only

```bash
# Build the image
docker build -t taspef-server .

# Run the container
docker run -d \
  --name taspef-app \
  -p 5000:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/taspef \
  -e JWT_SECRET=your-secret-key \
  -v $(pwd)/uploads:/app/uploads \
  taspef-server
```

### Docker Commands

```bash
# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up --build --force-recreate

# Clean up
docker-compose down -v --rmi all
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
CLIENT_URL=http://localhost:5174,https://www.taspef.org
```

## API Endpoints

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| POST   | `/api/files`              | Upload file       |
| GET    | `/api/files`              | List files        |
| GET    | `/api/files/:id`          | Get file metadata |
| GET    | `/api/files/:id/download` | Download file     |
| DELETE | `/api/files/:id`          | Delete file       |

## Technologies

- Node.js 18+
- Express 4.18.2
- MongoDB with Mongoose 8.0.3
- Multer 1.4.5
- Helmet 7.1.0
- CORS 2.8.5

## Documentation

See [main README](../README.md) for full documentation.
