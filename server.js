import express from "express";
import dotenv  from "dotenv"
const app = express()
dotenv.config()
import cors from 'cors'

import connect from "./database/config.js";

app.use(express.json());
app.use(cors())
// import userRoute from './routes/userRoute'
// const userRoute = require("./routes/userRoute")
import userRouter from "./routes/userRoute.js";
// import adminRouter from './routes/adminRoute.js'

// import router from "./routes/adminRoute";
// const adminRouter = require("./routes/adminRoute.js")
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

// app.use('/api/user',userRoute)
// app.use('/api/admin',adminRoute)

app.listen(port,()=>{console.log(`nodeserver started at port ${port} `)})
