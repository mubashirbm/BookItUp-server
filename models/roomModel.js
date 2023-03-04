import mongoose from "mongoose";

export const roomSchema= new mongoose.Schema({
        hotelId:{
          type:String
        },
        hotelName:{
          type:String
        },
        room: {
          type: String,
          // required: true,
        },
        price:{
          type:Number
        },
        description: {
          type: String,
          // required: true,
        },
        bed: {
          type: String,
          // required: true,
        },
        laundry: {
          type: String,
          // required: true,
        },
        AC: {
          type: String,
          // required: true,
        },
        wifi: {
          type: String,
          // required: true,
        },
        userId: {
          type: String,
          // required: true,
        },
        images:[],
       
        unavailableRoom:[]
      },
{
    timestamps:true

})
export default mongoose.model('Room',roomSchema);



