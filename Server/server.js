// const express = require("express");

// const app = express();

// const PORT = 5000;

// app.get("/", (req, res) => {
//     res.send("Smart Expense Tracker Backend Running");
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require("express");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(
    "mongodb+srv://expenseadmin:ExpenseTracker321@cluster0.304svgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const PORT = 5000;

// Allows server to read JSON data
app.use(express.json());

// Temporary expense storage
let expenses = [
    {
        id: 1,
        title: "Pizza",
        amount: 250,
        category: "Food"
    }
];

// GET all expenses
app.get("/expenses", (req, res) => {
    res.json(expenses);
});

// POST expense
app.post("/expenses", (req, res) => {

    const newExpense = {
        id: expenses.length + 1,
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category
    };

    expenses.push(newExpense);

    res.status(201).json({
        message: "Expense added successfully",
        expense: newExpense
    });
});

// DELETE expense
app.delete("/expenses/:id", (req, res) => {

    const expenseId = parseInt(req.params.id);

    expenses = expenses.filter(
        expense => expense.id !== expenseId
    );

    res.json({
        message: "Expense deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});