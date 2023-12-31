const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Chart = require('chart.js/auto'); 
var { Incomes, Expenses } = require("./models/model");
mongoose.connect("mongodb://localhost:27017/MoneyTracker");

var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection successful");
});
var app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.get("/Expenses", function (req, res) {
  Expenses.find({}).then((result2) => {
    res.render("Expenses", { list2: result2 });
  });
});

app.post("/Incomes", function (req, res) {
  var title = req.body.title;
  var amount = req.body.amount;
  var date = req.body.date;
  var salarytype = req.body.salarytype;
  var reference = req.body.reference;

  var data = {
    title: title,
    amount: amount,
    date: date,
    salarytype: salarytype,
    reference: reference
  };
  db.collection("incomes").insertOne(data, function (err, collection) {
    if (err) throw err;
    else {
      console.log("Record Inserted");
    }
  });
  res.redirect('/');
});
app.post("/Expenses", function (req, res) {
  var title = req.body.title;
  var amount = req.body.amount;
  var date = req.body.date;
  var expensetype = req.body.expensetype;
  var reference = req.body.reference;

  var data = {
    title: title,
    amount: amount,
    date: date,
    expensetype: expensetype,
    reference: reference
  };
  db.collection("expenses").insertOne(data, function (err, collection) {
    if (err) throw err;
    else {
      console.log("Record inserted");
    }
  });
  res.redirect('/Expenses')
});
app.get("/delete-incomes/:id", function (req, res) {
  const Id = req.params.id;
  Incomes.findOneAndDelete({_id:Id}).then(()=>{
    console.log("deleted")
  });
  res.redirect('/');
});
app.get("/delete-expenses/:id", function (req, res) {
  const Id = req.params.id;
  Expenses.findOneAndDelete({_id:Id}).then(()=>{
    console.log("deleted")
  });
  res.redirect('/Expenses');
});

app.get("/data", function (req, res) {
 
  Incomes.find({}).then((result) => {
    Expenses.find({})
      .then((result2) => {
        res.render("Product", { list1: result, list2: result2 });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get("/", function (req, res) {
    res.set({
      "Access-Control-Allow-Origin": "*",
    });
    Incomes.find({}).then((result) => {
      res.render("Incomes", { list1: result });
    });
  })
  .listen(3000);
console.log("Server is listening on port 3000");
