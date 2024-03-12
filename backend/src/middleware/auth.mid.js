import jwt from "jsonwebtoken";
const { verify } = jwt;
import { UNAUTHORIZE } from "../constants/httpStatus.js";

export default (req, res, next) => {
  const token = req.headers.access_token;

  if (!token) return res.status(UNAUTHORIZE).send();

  try {
    const decode = verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decode;
  } catch (error) {
    res.status(UNAUTHORIZE).send();
  }

  return next();
};
