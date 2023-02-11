import mongoose from "mongoose";

export const roomSchema= new mongoose.Schema({
        hotelId:{
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
        images:[],
        roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
      },
{
    timestamps:true

})
export default mongoose.model('Room',roomSchema);



