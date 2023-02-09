// import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userSchema from '../models/userModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import hotelSchema from '../models/hotelModel.js';

export async function register(req,res){
  try {
    console.log(req.body);
    const userExist = await userSchema.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(200)
        .send({ message: "user already exists", success: false });
    }
    const password = req.body.password; 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new userSchema(req.body);
console.log(newuser,"newUser")
    await newuser.save();
    res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "user already exists", success: false, error });
  }
}

export async function login(req,res){
  console.log(req.body,"before")
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    console.log(user,"user")
    if (!user) {
      console.log("!user")
      return res
      .status(200)
      .send({ message: "user does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.Password, user.password);
    if (isMatch && user.isActive ) {
      if(user.isAdmin){
        
        console.log("inside MATCH")
        console.log("isadmin")
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
        .status(200)
        .send({ message: "Login successful",success:true,isAdmin:true, data: token });
      }else{
        console.log("inside MATCH")
        console.log("isUser")
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
          res
          .status(200)
          .send({ message: "Login successful",success:true, data: token });
          
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
export async function getHotelByCity (req,res){
  console.log(req.params.city,"body")
  const city=req.params.city
try {
  const data= await hotelSchema.find({location:city}) 
  console.log(data)
  return res.send(data)
} catch (error) {
  console.log(error)
  
  
}
  
}
export async function hotelDetails (req,res){
  const Id=req.params.Id
  console.log(Id,"Idd")
  try {
    const data=await hotelSchema.findOne({_id:Id})
    console.log(data,"after Id ")
    return res.send(data)
  } catch (error) {
    
  }
}