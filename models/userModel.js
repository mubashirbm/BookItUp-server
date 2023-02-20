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
 
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
  
},{
    timestamps:true
})

// export default userModel = mongoose.model('users',userSchema)
export default mongoose.model('Users', userSchema);

// module.exports = userModel;
// export default userModel