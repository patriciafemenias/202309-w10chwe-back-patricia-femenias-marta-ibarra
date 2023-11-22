import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError } from "../../errorsMiddelwares";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middelware", () => {
  const errorMessage = "Error";
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();

  describe("When it receives a response's method status with a 400 error", () => {
    test("Then it should call the response's method status with 400", () => {
      const expectedSatusCode = 400;
      const error = new CustomError(errorMessage, expectedSatusCode);

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedSatusCode);
    });

    describe("When it receives a response and an error with status code", () => {
      test("Then it should call the response's method status with 500", () => {
        const expectedSatusCode = 500;
        const error = new Error("Error with status code");

        generalError(
          error as CustomError,
          req as Request,
          res as Response,
          next,
        );

        expect(res.status).toHaveBeenCalledWith(expectedSatusCode);
      });
    });

    describe("When it receives a response with an error with a message 'Error'", () => {
      test("Then it should call the response's method json with a 'Private error' message", () => {
        const privateErrorMessage = "Private error";
        const error = new CustomError(privateErrorMessage, 400);

        generalError(error, req as Request, res as Response, next);

        const errorResponseBody = {
          error: privateErrorMessage,
        };

        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining(errorResponseBody),
        );
      });
    });
  });
});
