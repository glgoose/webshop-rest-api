const request = require("supertest");
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const mongoose = require("mongoose");
let server;

describe("Index route", () => {
  beforeAll(() => {
    server = require("../../app");
  });
  afterAll(async () => {
    server.close();
    await Product.remove({});
    await Category.remove({});
  });

  describe("GET /products", () => {
    it("should return all products", async () => {
      await Product.insertMany([
        { title: "title1", description: "description1", price: 1, image: "image1" },
        { title: "title2", description: "description2", price: 2, image: "image2" },
      ]);
      const res = await request(server).get("/products");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      console.log(res.body);
      expect(res.body[1]).toMatchObject({ title: "title1", description: "description1", price: 1, image: "image1" });
      expect(res.body[0]).toMatchObject({ title: "title2", description: "description2", price: 2, image: "image2" });
    });
  });

  describe("GET /categories", () => {
    it("should return all categories", async () => {
      await Category.insertMany([
        { title: "title1", slug: "title1" },
        { title: "title2", slug: "title2" },
      ]);
      const res = await request(server).get("/categories");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toMatchObject({ title: "title1" });
      expect(res.body[1]).toMatchObject({ title: "title2" });
    });
  });

  describe("GET /search", () => {
    it("should return the searched product", async () => {
      await Product.insertMany([
        { title: "title1", description: "description1", price: 1, image: "image1" },
        { title: "title2", description: "description2", price: 2, image: "image2" },
      ]);
      const res = await request(server).get("/search?q=title1");
      expect(res.status).toBe(200);
    });
  });

  describe("GET /category/:categoryId", () => {
    it("should return the product filtered by category id", async () => {
      const category1 = mongoose.Types.ObjectId();
      const category2 = mongoose.Types.ObjectId();
      await Product.insertMany([
        { title: "title1", description: "description1", price: 1, image: "image1", category: category1 },
        { title: "title2", description: "description2", price: 2, image: "image2", category: category2 },
      ]);
      const res = await request(server).get(`/category/${category1}`);
      expect(res.status).toBe(200);
    });
  });
});
