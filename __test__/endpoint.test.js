const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.DB_CONNECTION);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* Testing the POST endpoint. */
describe("POST /api/products", () => {
  it("should create a new product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "test",
      price: 10,
      description: "test",
      category: "test",
      image: "test",
      quantity: 10,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

/* Testing the GET endpoint. */
describe("GET /api/products", () => {
  it("should get all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

/* Testing the GET by ID endpoint. */
describe("GET /api/products/:id", () => {
  it("should get a product", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});
