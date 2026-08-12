# Expense Tracker Frontend

This is the frontend for the **Expense Tracker** application, built with HTML, CSS, and vanilla JavaScript.

## 🚀 Live Demo
Deployed on [Netlify](https://www.netlify.com)

## 🔗 Backend
The backend API is deployed on [Render](https://render.com).  
Backend Repository: [Expense-Tracker-Backend](https://github.com/ravi5949singh/Expense-Tracker)

## 🛠️ How to Run Locally
1. Make sure the backend is running at `http://localhost:3000`.
2. Open `index.html` in your browser.

## 📦 Deployment
- **Frontend**: Netlify (this repo is linked to Netlify for auto-deploy on push)
- **Backend**: Render

## ⚙️ Configuration
Before deploying, update the `BASE_URL` in `script.js`:
```js
const BASE_URL = isLocalhost 
    ? "http://localhost:3000" 
    : "https://your-backend-name.onrender.com"; // Replace with your Render URL
```
