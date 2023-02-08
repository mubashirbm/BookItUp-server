
import express  from 'express';


const router = express.Router()
import * as controller from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import hotelModel from '../models/hotelModel.js';


router.route("/addHotel").post(controller.addHotel)
router.route("/getAllHotel").get(controller.getAllHotel)
router.route("/login").post(controller.login)
// router.route("delete").post(controller.delete)


router.route("/getAllUser").get(controller.getUsers)
router.route('/changeStatus/:status/:userId').get(controller.changeStatus)
router.route("/getAllUsers").get(controller.getUsers)
router.route('/deleteHotel/:hotelId').post(controller.deleteHotel)
router.route('/getHotelById/:hotelId').get(controller.hotelById)
router.route('/updateHotel').post(controller.updateHotel)





export default router


































// router.get("/get-all-users",authMiddleware, async(req,res)=>{
//     try {
//       const users = await userModel.find({isAdmin:false})
//       res.status(200).send({message:"user fetched succesfully",
//         success:true,
//         data:users
//     })
      
//     } catch (error) {
//       res.status(500)
//       .send({message:"error getting users list info",success:false, error})
//     }
//   })
//   router.post('/change-user-status',authMiddleware,async(req,res)=>{
//     try {
//         console.log('llll');
//         const userIdd=req.body.userIdd
//         console.log(userIdd,'nnn');
//         // const userId='6390bc9d71b944330228af9b'
//         console.log(userIdd);
//         const user=await userModel.findById({_id:userIdd})
//         console.log(user);
//         if(user.isActive){
//             console.log('undayittalla');
//             user.isActive=false
//         }else{
//             user.isActive=true
//         }
//         await user.save()
//         const users=await userModel.find({isAdmin:false})
//         res.status(200).send({
//             message:"Users-status change successfully",
//             success:true,
//             data:users
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             message:"error in fetching users",
//             success:false,
//             error
//         })
//     }
// })