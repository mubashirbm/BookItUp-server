import mongoose from "mongoose";

export const hotelSchema= new mongoose.Schema({
    hotel:{
        type:String,
        require:true
    },
    location:{
        type:String,
    
    },
    category:{
        type:String
        
    },
    description:{
        type:String,
        required:true
    },
    imageUrls:[],
   
   
},
{
    timestamps:true

})
export default mongoose.model('Hotel',hotelSchema);