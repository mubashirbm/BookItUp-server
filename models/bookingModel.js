import mongoose, { isValidObjectId } from "mongoose";

export const bookSchema= new mongoose.Schema({
    name:{
        type:String,
       
    },
    userId:{
        type:String
    },
    hotelName:{
        type:String
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Room'
       
    },
    checkin:{
        type:String,
    
    },
    checkout:{
        type:String,
    
    },
    CheckInDate:{
        type:String,
    
    },
    CheckOutDate:{
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
    adults:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    },
   
    
    UA:[],
   
   
},
{
    timestamps:true

})
export default mongoose.model('Booking',bookSchema);