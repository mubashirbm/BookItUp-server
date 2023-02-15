
import authMiddleware from '../middlewares/authMiddleware.js';
import hotelSchema from '../models/hotelModel.js';
import  userSchema from '../models/userModel.js';
import roomSchema from '../models/roomModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export async function addHotel(req,res){
  console.log(req.body,6666666666);
    try {
      console.log("777777777777777777")
        const exist=await hotelSchema.findOne({hotel:req.body.hotel})
        console.log(exist,"mmmmmmm")
        
        if(exist){
            return res
            .status(200)
            .send({ message: "Hotel already exists", success: false });
        }else{
console.log("888888888888888888888")
            console.log(req.body,"add hotel")
            const newhotel = new hotelSchema(req.body)
            console.log(newhotel,"newHotel")
            await newhotel.save()
            res.send({message:"new hotel added succesfully"})
            
        }
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}
export async function addRoom(req,res){
  console.log(req.body,6666666666);
  console.log(req.body,"body Room")
  console.log(req.params,"params Room")
  const room=req.body
  const hotelId=req.params.Id
    try {
      const newRoom = new roomSchema(req.body)
      console.log(newRoom,"newRoom")
      await newRoom.save()
      // try {
        await hotelSchema.findByIdAndUpdate(hotelId, {
          $push: { rooms: newRoom._id },
        });
        res.send({message:"new Room added succesfully"})
        
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

export async function hotelById(req,res){
  console.log("reeeech")
  console.log(req.params,"req.body")
  const hotelId=req.params.hotelId
  console.log(hotelId,"kkkkkkkkkkkkkkkkkkkkkkk")
  try {
    const data= await hotelSchema.findOne({_id:hotelId})
    console.log(data,"hooooooooooooooooooootel")
    res.json(data)
  } catch (error) {
    console.log(error)
  }
  // const {data}=await 

}

export async function deleteHotel(req,res){
  console.log("deleting back")
  // console.log(req.params)
  try {
    const hotelId=req.params.hotelId

    
    console.log(hotelId)
     await hotelSchema.deleteOne({_id:hotelId})
  
    res.send({status:true})
  } catch (error) {
    console.log(error)
    console.log("not deleted")
  }
}
export async function deleteRoom(req,res){
  console.log("deleting back")
  // console.log(req.params)
  try {
    const roomId=req.params.roomId

    
    console.log(roomId)
     await roomSchema.deleteOne({_id:roomId})
  
    res.send({status:true})
  } catch (error) {
    console.log(error)
    console.log("not deleted")
  }
}

export async function editHotel (req,res){
  try {
    const editHotel=await Hotel.findById(req.params.id,
      {
$set:req.body
      }
      )
      res.status(200).json(updateHotel)
  } catch (error) {
    res.status(500).json(error)
    
  }
}
export async function getAllHotel(req,res){

try {
    console.log("object in back")
    const Hotels=await hotelSchema.find({})
    return res.send(Hotels)
} catch (error) {
    console.log(error)
    return res.status(400).json({message:error})
}

}
export async function getAllRoom(req,res){

try {
    console.log("object in back")
    const Rooms=await roomSchema.find({})
    return res.send(Rooms)
} catch (error) {
    console.log(error)
    return res.status(400).json({message:error})
}

}
export async function login(req,res){
    console.log(req.body,"before")
    try {
      const user = await userSchema.findOne({ email: req.body.email });
      console.log(user,"usegffr")
      if (!user) {
        console.log("!user")
        return res
        .status(200)
        .send({ message: "admin does not exist", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.Password, user.password);
      if (isMatch && user.isAdmin ) {
        if(user.isAdmin){
          
          console.log("inside MATCH")
          console.log("isAdmin")
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            console.log(token,"token")
          res
          .status(200)
          .send({ message: "Login successful",success:true,isAdmin:true, data: token });
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
  export async function getUsers(req,res){
    try {
      const response=await userSchema.find({})
      res.status(200).send(response);
      console.log(response,"get all usersqqqq")
    } catch (error) {
     res.status(500).send({ message: "error"})      
      
    }
  }
  export const changeStatus =async (req,res) => {
    console.log(req.params,"aaaaaa")
    const { status, userId } = req.params;
    try {
    const result = await userSchema
        .updateOne(
          { _id: userId },
          {
            $set: {
              isActive: status,
            },
          }
        )
        console.log(result);
          res.status(200).json({ status: true , result });
        // .then((data) => {
          // }).catch((err) => {console.log(err,'err');})
        } catch (error) {
      console.log(error);
    }
  };

  export const updateHotel = async(req,res)=>{
 const {id,hotel,location,description,category,imageUrls:imageUrl} = req.body
    console.log(req.params,"ooooooooooooooooooo")
    console.log(hotel,location,description,category,"11111111111111111111111oooo")
   
    try {
      const result = await hotelSchema
          .updateMany(
            { _id: id },
            {
              $set: {
              hotel:hotel,
              location:location,
              description:description,
              category,
              imageUrls: imageUrl,
                    },
            }
          )
          console.log(result);
            res.status(200).json({ status: true , result });
          // .then((data) => {
            // }).catch((err) => {console.log(err,'err');})
          } catch (error) {
        console.log(error);
      }
    
  } 
  