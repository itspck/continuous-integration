import request from "supertest";
import app, { server } from "../index";

describe("index route", () => {
  afterAll(() => {
    server.close();
  });

  test("should respond with a 200 with no query parameters", () => {
    return request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toMatch(/test/);
      });
  });
});
