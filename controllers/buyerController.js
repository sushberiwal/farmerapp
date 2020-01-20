const buyerModel= require("../models/buyerModel")

module.exports.buyerDetails=async function(req,res){
const {id}=req.params;
const buyer=await buyerModel.find(id);
res.json({buyer});
}

module.exports.updateDetails= async function(req,res){
    const{id}=req.params;
    const update = req.body;
    const updatedBuyer= await buyerModel.findByIdAndUpdate(id,update,{new:true});
    res.json({updatedBuyer});
}

module.exports.addBuyer =async function (req, res) {
    try{
    const user = req.body;
    const newUser = await buyerModel.create(user);
    res.json({newUser});
    }

    catch(err){
        console.log(err);
        res.json(err);
    }
}