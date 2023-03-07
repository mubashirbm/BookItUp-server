// // const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";


// // export default async function Auth(req, res, next){
//   export default async function authMiddleware(req, res, next){
//   try {
//     console.log("inside auth")
//     console.log(req.body,"req.body")
//     const token = req.headers["authorization"].split(" ")[1];
//     console.log(token,"tokkkkkeeeeeeeeen")
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).send({
//           message: "Auth failed",
//           success: false,
//         });
//       } else {
//         req.body.userId = decoded.id;
//         next();
//       }
//     });
//   } catch (error) {
//     return res.status(401).send({
//       message: "Auth failed",
//       success: false,
//     });
//   }
// };
    


// const jwt = require("jsonwebtoken");
// import {  NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {    
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        message: "auth failed",
        Status: false,
      });
    }
    const [, token] = authHeader.split(" ");
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {    
          console.log(err);
                
          return res.send({
            message: "auth failed",
            Status: false,
          });
        } else {
          const { id } = decoded ;
         
          req.body.userId = id;
         
          next();
        }
      }
    );
  } catch (error) {
    console.log(error);
    
    return res.status(401).send({
      message: "auth failed",
      success: false,
    });
  }
};



export const localVariables  = (req  , res ,next)=>{
  console.log("first")
  // console.log(req,"reqq")
  req.app.locals = {
    
      OTP : null,

    }
    next()
  console.log(req.app.locals)

}