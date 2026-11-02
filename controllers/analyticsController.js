const Expense = require("../models/Expense");

exports.getAnalytics = async (req, res) => {
    try {
        const userId = req.user.userId;
        const allTransactions = await Expense.find({ userId });
        
        let totalIncome = 0;
        let totalExpense = 0;

        for (const t of allTransactions) {
            const amt = Number(t.amount) || 0;
            if (t.type === "income") {
                totalIncome += amt;
            } else {
                totalExpense += amt;
            }
        }

        const totalBalance = totalIncome - totalExpense;
        const totalSavings = Math.max(totalBalance, 0);

        res.json({
            totalBalance,
            totalExpense,
            totalIncome,
            totalSavings
        });
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ error: "Error calculating analytics" });
    }
};
