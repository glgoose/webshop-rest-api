const User = require("../../models/user.model");
const request = require("supertest");
let server;

describe("/user", () => {
  beforeAll(() => {
    server = require("../../app");
  });
  afterAll(async () => {
    server.close();
    await User.remove({});
  });

  describe("POST /register", () => {
    it("should register new user", async () => {
      const res = await request(server).post("/user/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "test@test.com",
        password: "123456",
      });
      const user = await User.find({});

      expect(user[0].firstName).toBeTruthy();
      expect(user[0].lastName).toBeTruthy();
      expect(user[0].email).toBeTruthy();
      expect(res.statusCode).toEqual(201);
    });
  });

  describe("POST /login", () => {
    it("should fail with incorrect credentials", async () => {
      const res = await request(server).post("/user/login").send({
        email: "dummy",
        password: "dummypassword",
      });

      expect(res.statusCode).toEqual(401);
    });

    it("should succeed with correct credentials", async () => {
      const res = await request(server).post("/user/login").send({
        email: "test@test.com",
        password: "123456",
      });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("GET /logout", () => {
    it("should logout successfully", async () => {
      const res = await request(server).get("/user/logout");
      console.log(res.body);
      expect(res.statusCode).toEqual(200);
      //   expect(res.body).toEqual({ ok: true })
    });
  });
});
