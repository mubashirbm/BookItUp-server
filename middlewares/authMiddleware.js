// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";


// export default async function Auth(req, res, next){
  export default async function authMiddleware(req, res, next){
  try {
    console.log("inside auth")
    console.log(req.body,"req.body")
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token,"tokkkkkeeeeeeeeen")
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
    