import mongoose from "mongoose";

export const bookSchema= new mongoose.Schema({
    name:{
        type:String,
       
    },
    userId:{
        type:String
    },
    roomId:{
        type:String,
       
    },
    checkin:{
        type:String,
    
    },
    checkout:{
        type:String,
    
    },
    email:{
        type:String
        
    },
    phone:{
        type:String
        
    },
    total:{
        type:Number
    },
    
    UA:[],
   
   
},
{
    timestamps:true

})
export default mongoose.model('Booking',bookSchema);