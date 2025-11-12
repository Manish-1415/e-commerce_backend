import jwt from "jsonwebtoken";
import ApiError from "./ApiError.utility.js";

export const generateAccessToken = (payload, secretKey, expiry) => {
  try {
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: expiry });

    return accessToken;
  } catch (error) {
    throw new ApiError(500, error.name);
  }
};

export const generateRefreshToken = (payload, secretKey, expiry) => {
  try {
    const refreshToken = jwt.sign(payload, secretKey, { expiresIn: expiry });

    return refreshToken;
  } catch (error) {
    throw new ApiError(500, error.name);
  }
};

export const validateToken = (tokenString, secretKey) => {
  try {
    return jwt.verify(tokenString, secretKey);
  } catch (error) {
    throw new ApiError(401, error.name);
  }
};
