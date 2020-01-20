const mongoose=require('mongoose')
const config=require('../configs/config')
const validator=require('validator')

mongoose.connect(config.DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(conn=>{
    console.log("farmers DB connected")
    // console.log(conn)
})

const farmerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        minlength:10
    },
    email:{
        type:String,
        unique:true,
        validate:validator.isEmail
    },
    address:{
        type:String,
        required:true
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    photo:{
    type:String
    },
    password:{
        type:String,
        required:true,
        minlength:5
    }
})

const farmerModel=mongoose.model('farmerModel',farmerSchema)
module.exports=farmerModel