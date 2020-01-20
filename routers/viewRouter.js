const viewRouter= require("express").Router()

const {getHomePage,getListingPage,getProfile}= require("../Controllers/viewController")
const {getSignupDetails,getLoginDetails,protectRoute}= require("../controllers/authController")
viewRouter.route("/signup").post(getSignupDetails)
viewRouter.route("/login").post(getLoginDetails)
viewRouter.route("/listing").get(getListingPage);
viewRouter.route("/profile").get(protectRoute,getProfile)

viewRouter.route("").get(getHomePage);
// viewRouter.route("/notAuthorized").get()

// viewRouter.route("/plans").get(getPlansPage)



module.exports= viewRouter;