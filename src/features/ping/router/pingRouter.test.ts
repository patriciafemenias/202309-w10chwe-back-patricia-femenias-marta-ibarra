import request from "supertest";
import app from "../../../server/app";
import "../../../server/index";

describe("Given a GET/ endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with the status 200 and the message '🏓'", async () => {
      const path = "/";
      const expectedMessage = "🏓";
      const expectedStatus = 200;

      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
