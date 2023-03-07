export const localVariables  = (req  , res )=>{
    console.log(req,"reqq")
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
  
  }