
import authMiddleware from '../middlewares/authMiddleware.js';
import hotelSchema from '../models/hotelModel.js';


export async function addHotel(req,res){
    try {
        const exist=hotelSchema.findOne({name:req.body.hotel})
        console.log(exist,"mmmmmmm")
        
        if(!exist){
            return res
            .status(200)
            .send({ message: "Hotel already exists", success: false });
        }if(exist){

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
export async function getAllHotel(req,res){
try {
    
    const Hotels=await hotelSchema.find({})
    console.log(Hotels)
    return res.send(Hotels)
} catch (error) {
    console.log(error)
    return res.status(400).json({message:error})
}

}