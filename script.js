// ===============================
// DOM ELEMENTS
// ===============================
const expenseForm = document.getElementById('expense-form');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalExpenseEl = document.getElementById('total-expense');
const remainingBalanceEl = document.getElementById('remaining-balance');
const filterMonth = document.getElementById('filter-month');
const filterCategory = document.getElementById('filter-category');

// ===============================
// STATE
// ===============================
let expenses = [];
let chartInstance = null;

const BASE_URL = "http://localhost:3000";

// ===============================
// BACKEND FUNCTIONS
// ===============================

// Load Expenses
async function loadExpenses() {
    try {
        const res = await fetch(`${BASE_URL}/expenses`);
        expenses = await res.json();
        updateUI();
    } catch (error) {
        console.error("Error loading expenses:", error);
    }
}

// Add Expense
async function addExpense(expense) {
    try {
        await fetch(`${BASE_URL}/add-expense`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });

        loadExpenses();
    } catch (error) {
        console.error("Error adding expense:", error);
    }
}

// Delete Expense
async function deleteExpense(id) {
    try {
        await fetch(`${BASE_URL}/delete-expense/${id}`, {
            method: "DELETE"
        });

        loadExpenses();
    } catch (error) {
        console.error("Error deleting:", error);
    }
}

// ===============================
// FORM SUBMIT
// ===============================
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!amount || !category || !date) {
        alert("Please fill all fields ❗");
        return;
    }

    const expense = { amount, category, date };

    addExpense(expense);

    expenseForm.reset();
    dateInput.valueAsDate = new Date();
});

// ===============================
// FILTER
// ===============================
function getFilteredExpenses() {
    const month = filterMonth.value;
    const category = filterCategory.value;

    return expenses.filter(exp => {
        const expMonth = exp.date.split('-')[1];
        return (month === 'all' || expMonth === month) &&
               (category === 'all' || exp.category === category);
    });
}

// ===============================
// UI UPDATE
// ===============================
function updateUI() {
    const filtered = getFilteredExpenses();
    renderExpenseList(filtered);
    updateTotals(filtered);
    renderChart(filtered);
}

// ===============================
// RENDER LIST
// ===============================
function renderExpenseList(data) {
    expenseList.innerHTML = '';

    if (data.length === 0) {
        expenseList.innerHTML = "<p>No expenses found</p>";
        return;
    }

    data.forEach(exp => {
        const div = document.createElement("div");

        div.innerHTML = `
            ${exp.category} - ₹${exp.amount} (${exp.date})
            <button onclick="deleteExpense('${exp._id}')">❌</button>
        `;

        expenseList.appendChild(div);
    });
}

// ===============================
// TOTAL
// ===============================
function updateTotals(data) {
    const total = data.reduce((sum, e) => sum + e.amount, 0);
    totalExpenseEl.innerText = `₹${total}`;
    remainingBalanceEl.innerText = `₹${total}`;
}

// ===============================
// CHART
// ===============================
function renderChart(data) {
    const canvas = document.getElementById("expenseChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const map = {};
    data.forEach(e => {
        map[e.category] = (map[e.category] || 0) + e.amount;
    });

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(map),
            datasets: [{
                label: "Expenses",
                data: Object.values(map)
            }]
        }
    });
}

// ===============================
// EVENTS
// ===============================
filterMonth.addEventListener("change", updateUI);
filterCategory.addEventListener("change", updateUI);

// ===============================
// INIT
// ===============================
dateInput.valueAsDate = new Date();
loadExpenses();