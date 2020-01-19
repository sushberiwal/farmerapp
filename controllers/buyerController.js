const buyerModel= require("../models/buyerModel")

module.exports.buyerDetails=function(req,res){
const {id}=req.params;
const buyer=await buyerModel.find(id);
res.json({buyer});
}

module.exports.updateDetails=function(req,res){
    const{id}=req.params;
    const update = req.body;
    const updatedBuyer=buyerModel.findByIdAndUpdate(id,update,{new:true});
    res.json({updatedBuyer});
}