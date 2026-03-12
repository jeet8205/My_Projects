# 🛒 E-Commerce Site

A simple full-stack E-Commerce web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---

## 📁 Project Structure

```
My_Projects/
└── E-Commerce Site/
    ├── Backend/       # Node.js + Express REST API
    ├── Frontend/      # React.js client
    ├── .gitignore
    └── package-lock.json
```

---

## 🚀 Features

- 🛍️ Browse and view products
- 🛒 Add to cart functionality
- 👤 User authentication (Register / Login)
- 📦 Order management
- 🔐 JWT-based authentication
- 📱 Responsive UI

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React.js, CSS           |
| Backend    | Node.js, Express.js     |
| Database   | MongoDB, Mongoose       |
| Auth       | JSON Web Tokens (JWT)   |

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

---

### 1. Clone the Repository

```bash
git clone https://github.com/jeet8205/My_Projects.git
cd My_Projects/E-Commerce\ Site
```

---

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

---

### 3. Setup Frontend

```bash
cd ../Frontend
npm install
npm start
```

The app will run at **http://localhost:3000**

---

## 🔗 API Endpoints (Backend)

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | /api/auth/register   | Register a new user  |
| POST   | /api/auth/login      | Login user           |
| GET    | /api/products        | Get all products     |
| GET    | /api/products/:id    | Get single product   |
| POST   | /api/orders          | Place an order       |

---

## 📸 Screenshots

> _Coming soon_

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

