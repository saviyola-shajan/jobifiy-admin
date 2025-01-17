const jwt =require('jsonwebtoken')
const Admin=require('../models/adminModel.js')

 const protectAdmin=(async(req,res,next)=>{
    let token 
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            token = req.headers.authorization.split(' ')[1]
    
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
            req.admin=await Admin.findById(decoded.id).select('-password')
    
            next()
        }catch(error){
         console.log(error);
         res.status(401)
         throw new Error("Not authorized")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("No token")
    }
    })

    module.exports={protectAdmin}