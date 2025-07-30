class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;

    // This captures the correct stack trace / error , it excludes this class , if not done then it will be like when giving error it will also include this class also
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
