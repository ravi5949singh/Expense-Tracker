const mongoose = require("mongoose");

// ===============================
// EXPENSE SCHEMA
// ===============================
const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

// ===============================
// EXPORT MODEL
// ===============================
module.exports = mongoose.model("Expense", expenseSchema);