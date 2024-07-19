const mongoose = require('mongoose')


const jobSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Company'
    },
    location:{
        type:String,
        unique:true
    },
    salary:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Job',jobSchema)