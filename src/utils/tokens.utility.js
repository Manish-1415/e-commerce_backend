import jwt from "jsonwebtoken";

export const generateAccessToken = (payload, secretKey, expiry) => {
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: expiry });

  return accessToken;
};

export const generateRefreshToken = (payload, secretKey, expiry) => {
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: expiry });

  return refreshToken;
};

export const validateToken = (tokenString) => {
  return jwt.verify(tokenString, process.env.ACCESS_SECRET_KEY);
};
