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
    rooms:{
        type:[String]
    },
    description:{
        type:String,
        // required:true
    },
    images:[],
   
   
},
{
    timestamps:true

})
export default mongoose.model('Hotel',hotelSchema);