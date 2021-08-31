const request = require("supertest");
const Product = require("../../models/product.model");
const mongoose = require("mongoose");
let server;

describe("Index route", () => {
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(async () => {
    server.close();
    await Product.remove({});
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
      expect(res.body.some((p) => p.title === "title1")).toBeTruthy();
      expect(res.body.some((p) => p.price === 1)).toBeTruthy();
      expect(res.body.some((p) => p.description === "description1")).toBeTruthy();
      expect(res.body.some((p) => p.image === "image1")).toBeTruthy();
      expect(res.body.some((p) => p.title === "title2")).toBeTruthy();
      expect(res.body.some((p) => p.price === 2)).toBeTruthy();
      expect(res.body.some((p) => p.description === "description2")).toBeTruthy();
      expect(res.body.some((p) => p.image === "image2")).toBeTruthy();
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
