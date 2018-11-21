import request from "supertest";
import app, { server } from "../index";

describe("index route", () => {

  test("should respond with a 200 with no query parameters", () => {
    return request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toMatch(/Pizza/);
      });
  });
});

describe("pizza route", () => {

  test("should respond with a 200 with no query parameters", () => {
    return request(app)
      .get("/pizza")
      .expect("Content-Type", /html/)
      .expect(200)
  });
});


describe("Add pizza",()=>{
  test("should respond with 200 with new pizza object",()=>{
    var name = "TEST 1";
    var sauce = ["Sauce tomate"];
    var viande = ["Poulet"];
    var fromage = ["Chevre"];
    var accompagnement = "Sauce dallas";
    var file = "";
    var piquante = false;
    return request(app).post("/new_pizza",{name, sauce, viande, fromage, accompagnement, file, piquante})
      .expect(200)
  })
  
})