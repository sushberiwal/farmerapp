

const farmerModel = require("../models/farmerModel")
module.exports.farmerDetails= async function(req,res)
{
    
    const tempData= await farmerModel.find({})
    res.json({tempData})
}



module.exports.updateDetails=  function(req,res){
    res.json({data:"updating details of the farmer"})
}