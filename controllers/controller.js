// import UserModel from '../models/userModel.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../models/userModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import hotelSchema from "../models/hotelModel.js";
import roomSchema from "../models/roomModel.js";
import  bookSchema from "../models/bookingModel.js";
import nodemailer from 'nodemailer'

export async function register(req, res) {
  try {
    console.log(req.body);
    // const userExist = await userSchema.findOne({ email: req.body.email });
    // if (userExist) {
      // return res
        // .status(200)
        // .send({ message: "user already exists", success: false });
    // }
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new userSchema(req.body);
    console.log(newuser, "newUser");
    await newuser.save();
    res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "user already exists", success: false, error });
  }
}

export async function verifyOtp(req,res){
  // console.log(req.query,'OTP CHECK')
  // console.log(req.body,'OTP CHECK')
  const otp=req.body.otp
  const OTP=req.app.locals.OTP
  // console.log(req.app.locals.OTP,"localvariable")
  console.log(OTP,"OTP")
  console.log(otp,"OOTTPP")
  try {
    if(otp===OTP){
      return res
      .status(200)
      .send({ message: "Otp success", success: true });
    }else{
      return res
      .status(200)
      .send({ message: "Otp incorrect", success: false });
    }
  } catch (error) {
    console.log(error)
  }
  
}

export async function login(req, res) {
  console.log(req.body, "before");
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    console.log(user, "user");
    if (!user) {
      console.log("!user");
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.Password, user.password);
    if (isMatch && user.isActive) {
      if (user.isAdmin) {
        console.log("!user");
        return res
          .status(200)
          .send({ message: "user does not exist", success: false });
      } else {
        console.log("inside MATCH");
        console.log("isUser");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .send({ message: "Login successful", success: true, data: token, user:user });
      }
    }
    // if (isMatch && user.isActive) {
    //   console.log("inside MATCH")
    //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //     expiresIn: "1d",
    //   });
    //   res
    //     .status(200)
    //     .send({ message: "Login successful", success: true, admin:false, data: token });
    // }
    else if (isMatch && !user.isActive) {
      return res
        .status(200)
        .send({ message: "You are blocked from this site", success: false });
    } else {
      return res
        .status(200)
        .send({ message: "password incorrect", success: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error logging in", success: false, error });
  }
}
// export async function authMiddleware(req,res){
//   try {
//     const user = await userModel.findOne({_id:req.body.userId})
//     user.password = undefined;
//     if(!user){
//       return res
//       .status(200)
//       .send({message:"user does not exixt",success:false})
//     }else{
//       res.status(200).send({success:true,
//         data:user
//       })
//     }
//   } catch (error) {
//     res.status(500)
//     .send({message:"error getting user info",success:false, error})
//   }

// }
export async function getHotelByCity(req, res) {
  console.log(req.params.city, "body");
  const city = req.params.city;
  try {
    const data = await hotelSchema.find({ location: city });
    console.log(data);
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
}
export async function hotelDetails(req, res) {
  const Id = req.params.Id;
  console.log(Id, "Idd");
  try {
    const data = await hotelSchema.findOne({ _id: Id });
    console.log(data, "after Id ");
    return res.send(data);
  } catch (error) {}
}
export async function roomDetails(req, res) {
  console.log("11111111111111111");
  const hotelId = req.params.Id;
  console.log(hotelId, "Iddss");
  try {
    const data = await roomSchema.find({
      hotelId: hotelId,
    });
    console.log("2222222222222222");
    console.log(data, "data of room bY Hotel id ");
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
}

export async function addDate(req, res) {
  console.log("update Room Backend");
  const hotelId = req.params.Id;
  console.log(req.params);
  const dates = req.body;
  console.log(dates, "dates");
  try {
    const data = await roomSchema.findOne({ _id: hotelId });
     data.unavailableRoom = [...data.unavailableRoom, ...dates]
     data.save()
    console.log(data, "roooom");
    // console.log(first)
   
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}
export async function checkDate(req, res) {
  console.log("check Room Backend");
  const hotelId = req.params.Id;
  console.log(req.params);
  const dates = req.body
  console.log(dates, "date2222s");
  try {
    const data = await roomSchema.findOne({ _id: hotelId });
    
    console.log(dates,"dates")
    console.log("unavilqqqq room",data.unavailableRoom)

function compareArrays(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        return false;
      }
    }
    return true;
  }

const status = compareArrays(data.unavailableRoom,dates)
console.log(status,"statukjhk")

    res.send(status);
  } catch (error) {
    console.log(error);
  }
}



export async function bookRoom(req,res){
  console.log(req.body,6666666666);
  console.log(req.body,"body Room")
  console.log(req.params,"params Room")
  const room=req.body
  const dates=req.body.UA
  const hotelId=req.params.Id
  console.log(room,"Room")
  console.log(hotelId,"hotelId")
    try {
      const data = await roomSchema.findOne({ _id: hotelId });
   data.unavailableRoom = [...data.unavailableRoom, ...dates]
   data.save()
  console.log(data, "roooom");
  
      const newBook = new bookSchema(req.body)
      console.log(newBook,"newRoom")
      await newBook.save()
      // try {
        // });
        res.send({message:"Booked Succesfully"})
        
      // } 
        // const exist=hotelSchema.findOne({name:req.body.Room})
        // console.log(exist,"mmmmmmm")
        
        // if(!exist){
            // return res
            // .status(200)
            // .send({ message: "Hotel already exists", success: false });
        // }if(exist){

        // }
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}



export async function mailer (req,res){
  const mail=req.body.email
  // console.log(mail,"maile")
  console.log(req.body,"reqqqqq")
  try {
    console.log(mail,"maile")
     const userExist = await userSchema.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(200)
        .send({ message: "user already exists", success: false });
    }

    let transporter = nodemailer.createTransport({
  
      service:'gmail',
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    
    });


    let randomNum = Math.floor(Math.random() * 10000).toString();
    // export const generateOtp :RequestHandler =  (req,res,next) => {
      req.app.locals.OTP = randomNum
      
      // console.log(req.app.locals.OTP );
      // res.status(201).json({code : req.app.locals.OTP})
  

console.log(randomNum,"gfdgf");

    let info ={
      from: 'mohdmubashirbm@gmail.com', // sender address
      to: mail, // list of receivers
      subject: 'Book It Up Otp Verification',
      text: randomNum , // plain text body

    };
  
 transporter.sendMail(info,(err)=>{
  if(err){
    console.log(err)
  }else{
    // console.log(req.app.locals.OTP,"local variable")
    console.log("email send")
  }
  // console.log(req.app.locals.OTP,"local variable")
  return res.send(info)
 })

  } catch (error) {
    console.log(error)
  }
}


export const getMyBookings= async (req,res)=>{
  try {
    console.log(req.params,"ID ")
    const Id=req.params.Id
    console.log(Id,"IDDDDDDD")
    const data = await bookSchema.find({userId:Id}).populate("roomId")
    console.log(data,"2222222222222222222222")
    return res.send(data)
  } catch (error) {
    console.log(error)
  }
}

export const cancelStatus =async (req,res) => {
  console.log(req.params,"aaaaaa")
  const roomId  = req.params.roomId;
  try {
  const result = await bookSchema
      .updateOne(
        { roomId: roomId },
        {
          $set: {
            canceled: true,
          },
        }
      )
      console.log(result);
        res.status(200).json(result);
      // .then((data) => {
        // }).catch((err) => {console.log(err,'err');})
      } catch (error) {
    console.log(error);
  }
};




// export async function roomCheck(req,res){
//   console.log(11111111111111)

//   const Id=req.params.roomId
//   console.log(Id,'roomId')
//   console.log(req.body,'dates')
//   try {
//     const data=await roomSchema.findOne({_id:Id})
//     console.log(data,"data");
//     const h = unavailableRoom.find((data)=>data===data.h)

//     console.log(data)
//   } catch (error) {

//   }
// }
