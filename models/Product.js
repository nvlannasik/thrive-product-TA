const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    quantity: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "products" },
  { versionKey: false }
);

productSchema.plugin(autoIncrement.plugin, "Product");
module.exports = mongoose.model("Product", productSchema);
