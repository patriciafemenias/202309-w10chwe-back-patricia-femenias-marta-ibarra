import { type Request, type Response } from "express";
import { notFoundError } from "../../errorsMiddelwares";
import CustomError from "../../../CustomError/CustomError";

describe("Given a notFoundError middelware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with a 404 'Endpoint not found' error", () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const expectedError = new CustomError("Endpoint not found", 404);

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
