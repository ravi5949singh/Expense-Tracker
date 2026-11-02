require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// ============================
// CORS Configuration for Render
// ============================
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ============================
// Static Files
// ============================
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.static(path.join(__dirname, "public")));

// Create uploads folder if it doesn't exist (needed on Render fresh deploy)
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// ============================
// MongoDB Connection
// ============================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ExpenseTracker";

const mongooseOptions = {
    serverSelectionTimeoutMS: 10000,   // Wait 10s before failing
    socketTimeoutMS: 45000,            // Close sockets after 45s of inactivity
    family: 4,                         // Force IPv4 — fixes DNS SRV issues on Render
    retryWrites: true,
    w: "majority"
};

const connectWithRetry = (retries = 5) => {
    mongoose.connect(MONGO_URI, mongooseOptions)
        .then(() => {
            console.log("MongoDB Connected ✅");
            console.log("Connected to:", MONGO_URI.split("@").pop() || "local"); // Log host, not password
        })
        .catch(err => {
            console.error(`MongoDB Connection Error ❌ (attempt ${6 - retries}/5):`, err.message);
            if (retries > 0) {
                console.log(`Retrying in 5 seconds... (${retries - 1} retries left)`);
                setTimeout(() => connectWithRetry(retries - 1), 5000);
            } else {
                console.error("❌ All MongoDB connection attempts failed. Running without DB.");
            }
        });
};

connectWithRetry();

// ============================
// API Routes
// ============================
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/ai", aiRoutes);

// ============================
// Serve Frontend (SPA Fallback)
// ============================
app.get("*", (req, res) => {
    const frontendIndex = path.join(__dirname, "frontend", "index.html");
    const publicIndex = path.join(__dirname, "public", "index.html");

    if (fs.existsSync(frontendIndex)) {
        res.sendFile(frontendIndex);
    } else if (fs.existsSync(publicIndex)) {
        res.sendFile(publicIndex);
    } else {
        res.status(200).send("Expense Tracker API is running! 🚀");
    }
});

// ============================
// Start Server
// ============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
});
