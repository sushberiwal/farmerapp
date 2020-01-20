const cropModel= require("../models/cropModel")

module.exports.getHomePage= function(req,res){
    // const plans = await planModel.find().limit(3)
    // res.render("home.pug",{title:"Home Page",plans});
    res.render("AgriApp.pug",{title:"AgriApp"})
};
module.exports.getListingPage= async function(req,res){
     const crops = await cropModel.find({})
    res.render("listing.pug",{title:"Listing page", crops})
}


module.exports.getProfile= async function(req,res)
{
res.render("profile.pug",user)
    
}