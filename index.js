const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const productRoute = require("./routes/product");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/products", productRoute);

//connect db
mongoose.connect(process.env.DB_CONNECTION);
let db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "MongoDB connection error: Connection failed")
);
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//listening port
app.listen(process.env.PORT_SERVER, () => {
  console.log("Server is running on port " + process.env.PORT_SERVER);
});

module.exports = app;
