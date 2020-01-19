const express = require("express")

const farmerRouter= express.Router();

const {farmerDetails,updateDetails}= require("../controllers/farmerController")

farmerRouter.route("/:id").get(farmerDetails).patch(updateDetails);





module.exports=farmerRouter;



//farmerDetails()=> farmerController => profile of a farmer