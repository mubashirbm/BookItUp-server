import express from "express";
import dotenv from "dotenv";
import cors from "cors"
const app = express();
dotenv.config();
// import cors from "cors";
// import nodemailer from 'nodemailer'

import connect from "./database/config.js";

app.use(express.json());

// const app = express();

app.use(cors({
  origin: 'https://www.bookitup.fitzone.fun',
  // origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE","HEAD", "OPTIONS"],
  credentials: true,  
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],

}));



// const corsOptions = {
//   origin: "*",
//   methods: "GET,POST,PUT,PATCH,DELETE",
//   httpOnly: false
// };
// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://www.bookitup.fitzone.fun");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

import userRouter from "./routes/userRoute.js";

import adminRouter from "./routes/adminRoute.js";

const port = process.env.PORT || 5500;

/** api routes */
app.use("/api", userRouter);
app.use("/admin", adminRouter);

connect()
  .then(() => {
    try {
      console.log("connected to database");
    } catch (error) {
      console.log("Cannot connect to database");
    }
  })
  .catch((error) => {
    console.log(error);
    console.log("invalid db connection");
  });

app.listen(port, () => {
  console.log(`nodeserver started at port ${port} `);
});
