const express = require("express")

const buyerRouter= express.Router();

const {buyerDetails,updateDetails,addBuyer}=require("../controllers/buyerController")

buyerRouter.route("/:id").get(buyerDetails).patch(updateDetails)

buyerRouter.route("").post(addBuyer)





module.exports=buyerRouter;
