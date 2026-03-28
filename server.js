// ===============================
// IMPORTS
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./Expense"); // ✅ ONLY THIS

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// MONGODB CONNECTION
// ===============================
mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Error:", err));

// ===============================
// ROUTES (APIs)
// ===============================

// Test route
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

// ➤ ADD EXPENSE
app.post("/add-expense", async (req, res) => {
    try {
        const newExpense = new Expense(req.body);
        await newExpense.save();
        res.send("Expense Saved ✅");
    } catch (error) {
        res.status(500).send("Error saving expense");
    }
});

// ➤ GET ALL EXPENSES
app.get("/expenses", async (req, res) => {
    try {
        const data = await Expense.find();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching expenses");
    }
});

// ➤ DELETE EXPENSE
app.delete("/delete-expense/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.send("Deleted ✅");
    } catch (error) {
        res.status(500).send("Error deleting expense");
    }
});

// ===============================
// START SERVER
// ===============================
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});
