import mongoose from "mongoose";

export const roomSchema= new mongoose.Schema({
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        maxPeople: {
          type: Number,
          required: true,
        },
        descrption: {
          type: String,
          required: true,
        },
        roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
      },
{
    timestamps:true

})
export default mongoose.model('Room',roomSchema);



