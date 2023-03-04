
import authMiddleware from '../middlewares/authMiddleware.js';
import hotelSchema from '../models/hotelModel.js';
import  userSchema from '../models/userModel.js';
import roomSchema from '../models/roomModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bookSchema from '../models/bookingModel.js';

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
export async function updateRoom(req,res){
  console.log(req.body,6666666666);
  console.log(req.body,"body Room")
  console.log(req.params,"params Room")
  const room=req.body
  const roomId=req.params.Id
    try {
      console.log("22222222222222222222222")

      // try {
        const data = await roomSchema.findByIdAndUpdate(roomId,room,{new:true}); 
        console.log(data,"edited room")
        res.send({room,message:"Room updated succesfully"})
        
     
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}
export async function updatHotel(req,res){
  console.log(req.body,6666666666);
  console.log(req.body,"body Room")
  console.log(req.params,"params Room")
  const hotel=req.body
  const Id=req.params.Id
    try {
      console.log("22222222222222222222222")

      // try {
        const data = await hotelSchema.findByIdAndUpdate(Id,hotel,{new:true}); 
        console.log(data,"edited Hotel")
        res.send({data,message:"Hotel updated succesfully"})
        
     
        
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
      const name=await userSchema.findOne({ email: req.body.email });
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
          const adminToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            console.log(adminToken,"adminToken")
          res
          .status(200)
          .send({ message: "Login successful",success:true,isAdmin:true, data: adminToken ,name:name});
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

  export const getAllBookings =async (req,res)=>{
try {
  const data=await bookSchema.find({})
  console.log(data,'ALL HOTELS')
  res.send(data)
} catch (error) {
  console.log(error)
}

  }



  export const getUserChart = async (req,res)=>{
    try {
      const result = await bookSchema.aggregate([
        {
          $group: {
            _id: { $month: '$date' },
            bookings: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      const bookings = result.map((r) => r.bookings);
      const months = result.map((r) => getMonthName(r._id));
      console.log(bookings,months)
      res.json({ bookings, months });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } 
  function getMonthName(month) {
    const date = new Date(Date.UTC(0, month - 1, 1));
    return date.toLocaleString('en-US', { month: 'long' });
  }

  export const revenueChart =async (req,res)=>{
    try {
      const bookings = await bookSchema.aggregate([
        // {
        //   $match: {
        //     status: 'paid',
        //   },
        // },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: '$createdAt' },
            },
            revenue: {
              $sum: '$total',
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
  
      const months = bookings.map(booking => booking._id);
      const revenue = bookings.map(booking => booking.revenue);
  
      res.json({ months, revenue });
    }  catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }