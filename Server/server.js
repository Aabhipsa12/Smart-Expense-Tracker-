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

const Expense = require("./models/Expense");

const app = express();



mongoose.connect(
  "mongodb+srv://expenseadmin:ExpenseTracker321@cluster0.304svgo.mongodb.net/expenseTrackerDB?retryWrites=true&w=majority&appName=Cluster0"
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


// GET all expenses
app.get("/expenses", async (req, res) => {

    try {

        const expenses = await Expense.find();

        res.json(expenses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// POST expense
app.post("/expenses", async (req, res) => {

    try {

        const newExpense = new Expense({
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category
        });

        const savedExpense = await newExpense.save();

        res.status(201).json({
            message: "Expense saved to MongoDB",
            expense: savedExpense
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// DELETE expense
app.delete("/expenses/:id", async (req, res) => {

    
   

    try {

        const deletedExpense =
            await Expense.findByIdAndDelete(req.params.id);


        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});