## 📚 Book Review API

A simple RESTful API for managing books, user authentication, and user-submitted reviews. Built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

---

## 🚀 Features

* JWT-based user authentication
* User signup and login
* Add and list books (with pagination and filters)
* View book details with average rating and paginated reviews
* Submit one review per book (per user)
* Update and delete your own reviews
* Search books by title or author (case-insensitive)

---

## 🧱 Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* JSON Web Tokens (JWT) for authentication
* Bcrypt for password hashing
* Thunder Client/Postman for API testing

---

## 📁 Project Structure

```
book-review-api/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── app.js
├── server.js
├── .env
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key
```

---

## 🛠️ Installation & Run Locally

```bash
git clone https://github.com/bhatiamanan/book-review-api.git
cd book-review-api

npm install
npm run dev  # uses nodemon to auto-reload
```

Make sure MongoDB is running (`mongod`)

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/auth/signup` | Register new user |
| POST   | `/api/auth/login`  | Login & get JWT   |

### 📘 Books

| Method | Endpoint                 | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| POST   | `/api/books`             | Add a new book (requires JWT)        |
| GET    | `/api/books`             | Get all books (pagination + filters) |
| GET    | `/api/books/:id`         | Get book details + reviews           |
| POST   | `/api/books/:id/reviews` | Add review (one per user/book)       |

Query examples:

* `/api/books?author=orwell`
* `/api/books?genre=dystopian&page=1&limit=5`

### ✏️ Reviews

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| PUT    | `/api/reviews/:id` | Update your review |
| DELETE | `/api/reviews/:id` | Delete your review |

### 🔍 Search

| Method | Endpoint                  | Description                               |
| ------ | ------------------------- | ----------------------------------------- |
| GET    | `/api/search?query=harry` | Search by title or author (partial match) |

---

## 🧬 Database Schema (Mongoose Models)

### 🧑 User

```js
{
  username: String,
  email: String,
  password: String (hashed)
}
```

### 📘 Book

```js
{
  title: String,
  author: String,
  genre: String,
  createdBy: ObjectId (User)
}
```

### ✍️ Review

```js
{
  bookId: ObjectId (Book),
  userId: ObjectId (User),
  rating: Number (1–5),
  comment: String
}
```

---

## 📦 Sample API Usage (cURL)

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"john","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"john@example.com","password":"123456"}'

# Create a book (requires Bearer token)
curl -X POST http://localhost:3000/api/books \
-H "Authorization: Bearer <JWT>" \
-H "Content-Type: application/json" \
-d '{"title":"1984","author":"George Orwell","genre":"Dystopian"}'
```

---

## 🧠 Design Decisions

* Used a single review per user per book rule
* Used RegExp for flexible search functionality
* Populated usernames in reviews to avoid separate user API calls
* Pagination applied on books and reviews for scalability

---

## 📌 TODO / Improvements (Optional)

* Add admin role for managing books
* Like/dislike or voting on reviews
* Soft delete or reporting mechanism
* Swagger/OpenAPI docs

---