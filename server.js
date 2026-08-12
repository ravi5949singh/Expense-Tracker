require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expenseDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes); // Updated to generic plural
app.use("/api/budget", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/ai", aiRoutes);

// Serve frontend index.html for non-API routes
app.get('*', (req, res) => {
    const fs = require('fs');
    if (fs.existsSync(path.join(__dirname, "frontend", "index.html"))) {
        res.sendFile(path.join(__dirname, "frontend", "index.html"));
    } else {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
