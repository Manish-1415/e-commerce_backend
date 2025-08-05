class ApiError extends Error {
  constructor(statusCode, message) {
    // While extending & creating a new class from existing one, we can provide our own properties & methods in the constructor  , means get the parents properties & methods and provide yours also.
    super(message); //Super is used for overwrite something ,

    this.statusCode = statusCode;
    this.message = message;

    // This captures the correct stack trace / error , it excludes this class , if not done then it will be like when giving error it will also include this class also
    Error.captureStackTrace(this, this.constructor); //It tells backend , when error occurred dont include this ApiError Class in the root error place .
  }
}

export default ApiError;
