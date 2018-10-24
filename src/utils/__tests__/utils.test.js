import request from "supertest";
import add from "../add";

describe("add", () => {
  test("should add two numbers", () => {
    expect(add(1, 1)).toEqual(2);
  });
});
