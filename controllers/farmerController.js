

const farmerModel = require("../models/farmerModel")

module.exports.farmerDetails= async function(req,res){
    const {id}=req.params;
    const farmer=await farmerModel.find(id);
    res.json({farmer});
}

module.exports.updateDetails=async function(req,res){
    const{id}=req.params;
    const update = req.body;
    const updatedFarmer=bfarmerModel.findByIdAndUpdate(id,update,{new:true});
    res.json({updatedFarmer});
}