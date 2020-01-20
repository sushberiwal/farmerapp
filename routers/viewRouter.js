const viewRouter= require("express").Router()

const {getHomePage,getListingPage}= require("../Controllers/viewController")
const {getSignupDetails,getLoginDetails}= require("../controllers/authController")
viewRouter.route("/signup").post(getSignupDetails)
viewRouter.route("/login").post(getLoginDetails)
viewRouter.route("/listing").get(isUserLoggedIn,getListing,getListingPage);

viewRouter.route("").get(getHomePage);
viewRouter.route("/notAuthorized").get()

// viewRouter.route("/plans").get(getPlansPage)



module.exports= viewRouter;