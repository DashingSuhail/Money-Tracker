const mongoose = require("mongoose");

const Incomeschema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: Date,
  salarytype: String,
  reference: String
});
const Incomes = mongoose.model("Incomes", Incomeschema);

const Expenseschema = new mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
    expensetype: String,
    reference: String
});
const Expenses = mongoose.model("Expenses", Expenseschema);

module.exports = { Incomes, Expenses };
