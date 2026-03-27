# GameVault Backend API

Go + MongoDB REST API backend for the GameVault React frontend.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Go | 1.21+ |
| MongoDB | 6.0+ (local) or MongoDB Atlas |

---

## Setup & Run

### 1. Install MongoDB locally (if not using Atlas)
Download from https://www.mongodb.com/try/download/community and start:
```bash
mongod --dbpath /data/db
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Install dependencies & run
```bash
cd gamesitebknd-main
go mod tidy
go run main.go
```

Server starts at **http://localhost:3001**

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/getlogin` | Fetch all users (used by frontend login) |
| `POST` | `/api/signup` | Register a new user |
| `POST` | `/api/login` | Secure login → returns JWT token |

#### POST /api/signup — Request Body
```json
{
  "Username": "JohnDoe",
  "Email": "john@example.com",
  "Password": "secret123"
}
```

#### POST /api/login — Request Body
```json
{
  "Email": "john@example.com",
  "Password": "secret123"
}
```

---

### Contact / Support
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact/feedback form |
| `GET` | `/api/getContact` | List all contact submissions |
| `DELETE` | `/api/deleteContact/:id` | Delete a contact by MongoDB ID |

#### POST /api/contact — Request Body
```json
{
  "UserId": "abc12345",
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john@example.com",
  "PhoneNumber": "1234567890",
  "Address": "123 Main St",
  "YourFeedback": "Great website!"
}
```

---

### Cart / Purchases
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/cart` | Save a purchased game |
| `GET` | `/api/cart` | List all purchased games |

#### POST /api/cart — Request Body
```json
{
  "title": "Elden Ring",
  "price": 59.99
}
```

---

### Health Check
```
GET /health
```

---

## MongoDB Collections

| Collection | Purpose |
|------------|---------|
| `users` | Registered user accounts |
| `contacts` | Contact/feedback form submissions |
| `cart` | Individual purchased game items |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `MONGO_URI` | `mongodb://localhost:27017` | MongoDB connection string |
| `MONGO_DB_NAME` | `gamevaultdb` | Database name |
| `JWT_SECRET` | — | Secret key for JWT signing |
| `APP_ENV` | `development` | `development` or `production` |
| `FRONTEND_URL` | `http://localhost:3000` | Allowed CORS origin |

---

## Project Structure

```
gamesitebknd-main/
├── main.go              # Entry point: router setup + server
├── go.mod               # Go module dependencies
├── .env                 # Environment variables (git-ignored)
├── .env.example         # Template for .env
├── config/
│   └── config.go        # Load and expose env vars
├── database/
│   └── mongodb.go       # MongoDB connection + collection helpers
├── models/
│   ├── user.go          # User model + request/response types
│   ├── contact.go       # Contact model + request type
│   └── cart.go          # CartItem + Order models
├── handlers/
│   ├── auth.go          # Signup, GetLogin, Login
│   ├── contact.go       # CreateContact, GetContacts, DeleteContact
│   └── cart.go          # SaveCartItem, GetCartItems
└── middleware/
    └── cors.go          # CORS headers for React frontend
```
