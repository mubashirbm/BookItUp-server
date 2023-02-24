import express  from "express"
import dotenv  from "dotenv"
const app = express()
dotenv.config()
import cors from 'cors'
// import nodemailer from 'nodemailer'

import connect from "./database/config.js";

app.use(express.json());


let corsOption = {
    origin: "https://bookitup.fitzone.fun",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  };
app.use(cors(corsOption))



import userRouter from "./routes/userRoute.js";

import adminRouter from "./routes/adminRoute.js"

const port = process.env.PORT || 5000;

/** api routes */
app.use('/api', userRouter)
app.use('/admin',adminRouter)



connect().then(()=>{
    try {
        console.log("connected to database")
    } catch (error) {
        console.log("Cannot connect to database")
    }
}).catch(error=>{
    console.log(error)
    console.log("invalid db connection")
})


app.listen(port,()=>{console.log(`nodeserver started at port ${port} `)})
