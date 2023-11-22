class CustomError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly customError?: string,
  ) {
    super(message);
  }
}

export default CustomError;
