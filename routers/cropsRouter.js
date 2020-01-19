const express = require("express")

const cropsRouter= express.Router();

const {getAllCrops,addCrop,deleteCrop,checkInput,addCrop_sms}= require("../controllers/cropsController")



cropsRouter.route("").get(getAllCrops).post(checkInput,addCrop).delete(deleteCrop)

cropsRouter.route("/sms").post(addCrop_sms);



module.exports=cropsRouter;
