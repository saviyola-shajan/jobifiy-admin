const mongoose = require('mongoose')


const companySchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

module.exports=mongoose.model('Company',companySchema)