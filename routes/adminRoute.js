
import express  from 'express';


const router = express.Router()
import * as controller from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import hotelModel from '../models/hotelModel.js';
import userModel, { userSchema } from '../models/userModel.js';




router.route("/addHotel").post(authMiddleware,controller.addHotel)
router.route("/addRoom/:Id").put(authMiddleware,controller.addRoom)
router.route("/getAllHotel").get(controller.getAllHotel)
router.route("/updateRoom/:Id").put(authMiddleware,controller.updateRoom)
router.route("/getAllRoom").get(authMiddleware,controller.getAllRoom)
router.route("/login").post(controller.login)
// router.route("delete").post(controller.delete)


router.route("/getAllUser").get(authMiddleware,controller.getUsers)
router.route('/changeStatus/:status/:userId').get(authMiddleware,controller.changeStatus)
router.route('/changeBookingStatus/:status/:userId').get(authMiddleware,controller.changeBookingStatus)
router.route("/getAllUsers").get(authMiddleware,controller.getUsers)
router.route('/deleteHotel/:hotelId').post(authMiddleware,controller.deleteHotel)
router.route('/deleteRoom/:roomId').post(authMiddleware,controller.deleteRoom)
router.route('/getHotelById/:hotelId').get(authMiddleware,controller.hotelById)
router.route('/updateHotel/:Id').put(authMiddleware,controller.updatHotel)

router.route('/getAllBooking').get(authMiddleware,controller.getAllBookings)
router.route("/getChart").get(authMiddleware, controller.getUserChart)
router.route("/getrevenue").get(authMiddleware,controller.revenueChart)
router.route('/getRoomById/:Id').get(authMiddleware,controller.getBookedRoom)
router.route('/getBookingTotal').get(authMiddleware,controller.getBookingTotal)
router.route('/getCanceled').get(authMiddleware,controller.getCanceled)
router.route('/totalRevenue').get(authMiddleware,controller.getTotalRevenue)
router.route('/totalUser').get(authMiddleware,controller.totalUser)
// router.get("/getChart",authMiddleware, controller.getUserChart)
// router.get("/getrevenue",controller.revenueChart)




// export default router


































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

router.post("/get-admin-info-by-id",authMiddleware, async(req,res)=>{
    try {
        console.log("mmmmmmmmmmmmmmmmmmm")
      const user = await userModel.findOne({_id:req.body.userId})
      user.password = undefined;
      if(!user){
        return res
        .status(200)
        .send({message:"admin does not exixt",success:false})
      }if(user){
        if(user.isAdmin){
            res.status(200).send({success:true,
              data:user
            })
        }else{
            return res
        .status(200)
        .send({message:"admin does not exixt",success:false})
        }
      }else{
        return res
        .status(200)
        .send({message:"admin does not exixt",success:false})
      }
    } catch (error) {
      res.status(500)
      .send({message:"error getting user info",success:false, error})
    }
  })
  
  export default router;
  