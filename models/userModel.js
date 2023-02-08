// const mongoose = require('mongoose')
import mongoose from 'mongoose';


export const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isDoctor:{
        type: Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    seenNotifications:{
        type:Array,
        default:[]
    },
    unseenNotifications:{
        type:Array,
        default:[]
    },
  
},{
    timestamps:true
})

// export default userModel = mongoose.model('users',userSchema)
export default mongoose.model('Users', userSchema);

// module.exports = userModel;
// export default userModel