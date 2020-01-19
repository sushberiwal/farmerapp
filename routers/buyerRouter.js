const express = require("express")

const buyerRouter= express.Router();

const {buyerDetails,updateDetails}=require("../controllers/buyerController")

buyerRouter.route("/:id").get(buyerDetails).patch(updateDetails)





module.exports=buyerRouter;
