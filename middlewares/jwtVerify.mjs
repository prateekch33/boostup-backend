import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtverify = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userid = decoded.id;
    next();
  } catch (error) {
    res.json({ status: -1, error: error.message });
  }
};

export default jwtverify;
