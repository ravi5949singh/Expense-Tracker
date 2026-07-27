# 💰 Expense Tracker

<p align="center">
  <h3 align="center">A Smart AI-Powered Expense Tracker</h3>
  <p align="center">
    Track expenses, manage budgets, achieve savings goals, and get AI-powered financial insights.
  </p>
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript)

</p>

---

# 📑 Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- API Routes
- Installation
- Environment Variables
- Running the Project
- Security
- AI Integration
- Future Improvements
- Contributing
- License

---

# 📖 Overview

Expense Tracker is a full-stack backend application that helps users manage their finances efficiently.

Users can:

- Register securely
- Login using JWT Authentication
- Add and manage expenses
- Set monthly budgets
- Create savings goals
- Upload expense images
- Get AI-powered financial assistance using Google Gemini
- Store data securely in MongoDB

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

---

## 💸 Expense Management

- Add Expense
- Update Expense
- Delete Expense
- View Expenses
- Upload Expense Images
- Expense Categories

---

## 💰 Budget Management

- Create Budget
- Update Budget
- View Budget

---

## 🎯 Goal Management

- Create Financial Goals
- Update Goals
- Delete Goals
- Track Progress

---

## 🤖 AI Assistant

Powered by **Google Gemini API**

- Financial Suggestions
- Expense Analysis
- Smart Responses

---

## 🛡 Security

- JWT Authentication
- bcrypt Password Hashing
- Environment Variables
- CORS Enabled
- Protected APIs

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## AI

- Google Gemini API

## File Upload

- Multer

## Deployment

- Vercel

---

# 📂 Project Structure

```
Expense-Tracker
│
├── controllers
│   ├── authController.js
│   ├── expenseController.js
│   ├── budgetController.js
│   ├── goalController.js
│   └── aiController.js
│
├── middleware
│   └── auth.js
│
├── models
│   ├── User.js
│   ├── Expense.js
│   ├── Budget.js
│   ├── Goal.js
│   └── Chat.js
│
├── routes
│   ├── authRoutes.js
│   ├── expenseRoutes.js
│   ├── budgetRoutes.js
│   ├── goalRoutes.js
│   └── aiRoutes.js
│
├── uploads
├── server.js
├── package.json
└── vercel.json
```

---

# 🚀 API Routes

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/auth` | User Authentication |
| GET / POST | `/api/expenses` | Expense APIs |
| GET / POST | `/api/budget` | Budget APIs |
| GET / POST | `/api/goals` | Goal APIs |
| POST | `/api/ai` | AI Chat |

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/ravi5949singh/Expense-Tracker.git
```

Go inside

```bash
cd Expense-Tracker
```

Install Packages

```bash
npm install
```

---

# 🔑 Environment Variables

Create a **.env**

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_api_key
```

---

# ▶ Running Project

Development

```bash
npm start
```

Server

```
http://localhost:3000
```

API Response

```
Expense Tracker API is running!
```

---

# 🤖 AI Integration

Google Gemini is integrated for:

- Financial advice
- Smart responses
- Personalized suggestions
- Budget recommendations

---

# 🔒 Security

- Password Hashing (bcrypt)
- JWT Authentication
- MongoDB Validation
- Protected Routes
- Environment Variables
- Secure File Upload

---

# 📸 Screenshots

Add screenshots here.

```
docs/

├── login.png

├── register.png

├── dashboard.png

├── expenses.png

├── budget.png

├── goals.png
```

---

# 🚀 Future Improvements

- Expense Analytics Dashboard
- Monthly Reports
- Charts & Graphs
- Email Notifications
- Dark Mode
- Multi Currency Support
- Export PDF Reports
- Expense Predictions
- OCR Bill Scanner

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Ravi Singh**

GitHub:
https://github.com/ravi5949singh

---

## ⭐ Show your support

If you like this project,

⭐ Star this repository

🍴 Fork it

💙 Share it with others

---

<p align="center">

Made with ❤️ using Node.js, Express.js, MongoDB & Gemini AI

</p>
