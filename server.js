require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const dns = require("dns");

// Use reliable Google/Cloudflare DNS for MongoDB SRV resolution
try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
    console.warn("Could not set custom DNS servers:", e.message);
}

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

// Safe masked URL for debugging without exposing password
const maskedUri = MONGO_URI.replace(/:([^:@]+)@/, ":****@");
console.log("🔗 MongoDB target URI:", maskedUri);

const mongooseOptions = {
    serverSelectionTimeoutMS: 15000,   // Wait 15s before failing
    socketTimeoutMS: 45000,            // Close sockets after 45s of inactivity
    retryWrites: true,
    w: "majority"
};

const connectWithRetry = (retries = 10) => {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) return;
    mongoose.connect(MONGO_URI, mongooseOptions)
        .then(() => {
            console.log("MongoDB Connected ✅");
            console.log("Connected to:", maskedUri);
        })
        .catch(err => {
            console.error(`MongoDB Connection Error ❌ (retries left: ${retries}):`, err.message);
            if (retries > 0) {
                console.log("Retrying MongoDB connection in 5 seconds...");
                setTimeout(() => connectWithRetry(retries - 1), 5000);
            } else {
                console.error("❌ MongoDB connection failed. Will retry on next request.");
            }
        });
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected! Reconnecting in 5s...");
    setTimeout(() => connectWithRetry(5), 5000);
});

connectWithRetry();

// ============================
// API Routes
// ============================
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);

// Health check endpoint with DB status
app.get("/api/health", (req, res) => {
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    const state = mongoose.connection.readyState;
    if (state === 0) {
        connectWithRetry(3);
    }
    res.json({
        status: state === 1 ? "healthy" : "reconnecting",
        database: states[state] || "unknown",
        readyState: state,
        timestamp: new Date().toISOString()
    });
});

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
