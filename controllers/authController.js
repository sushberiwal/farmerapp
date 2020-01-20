const jwt=require("jsonwebtoken");   // install krle json web token 
const KEY = require("../configs/config").KEY;  //is folder mein key bana le configs ke 
const buyerModel=require("../models/buyerModel")
const farmerModel=require("../models/farmerModel")

module.exports.getSignupDetails=async function(req,res){
    //1. req.body check for input
    //2. create user 
    try{
      // console.log(req.body)
        const{role}=req.body;
        if(role=="Farmer"){
        const farmer = await farmerModel.create(req.body);
        //3. create Token
        const token= await jwt.sign(JSON.stringify(farmer["_id"]+" "+role),KEY);
        
        res.json({
            result:"farmer account was created"
        });
     }
     else{
        const buyer = await buyerModel.create(req.body);
        //3. create Token
        const token= await jwt.sign(JSON.stringify(buyer["_id"]),KEY); // key doosri to nhi chahiye ? ask sir
        res.json({
          result:"buyer account was created"
        });
     }
    }
    catch(err){
        console.log(err);
        res.json({result:null});
    }
} 
module.exports.getLoginDetails = async function(req, res) {
    try {
      // 1. req.body check
      if (req.body.password == undefined || req.body.phone == undefined) {
        return res.json({result:"undefined"});
      }
      //  2. check user
      const { phone, password } = req.body;
      const buyer = await buyerModel.findOne({phone});
        const farmer = await farmerModel.findOne({phone});
        console.log(buyer);
      if (buyer!==null) {
         if (password == buyer.password) {
          //3. create Token
          console.log(buyer);
          const token = await jwt.sign(JSON.stringify(buyer["_id"]), KEY);
          return res.json({
            result:"Logged in",role:"buyer"
          });
        } 
        else {
          return res.json({result:"Wrong Credentials"});
        }
      }
      else if(farmer!==null){
        if (password == farmer.password) {
            //3. create Token
            console.log(farmer);
            const token = await jwt.sign(JSON.stringify(farmer["_id"]), KEY);
            return res.json({
              result:"Logged in",role:"farmer"
            });
          } 
          else {
            return res.json({result:"Wrong Credentials"});
          }
      }
      else{
          res.json({result:"not found!"});
      }
    } 
    catch (err) {
      console.log(err);
      res.json({result:null});
    }
  };
module.exports.protectRoute = async function(req, res,next) {
// console.log(req.cookie);
const token = req.cookies
? req.cookies.jwt
: null || req.headers.authorization
? req.headers.authorization.split(" ")[1]
: null;

console.log(token);
try {
  if (token) {
    const ans = await jwt.verify(`${token}`, secret);
    console.log(ans);
    id,type
  const model=type=="buyer"?buyerModel:farmerModel;
  if (ans) {
    const user = await userModel.findOne({ _id: ans.id });
    req.role = user.role;
    req.user = user;
    next();
  } else {
    return res.status(401).json({
      data: "Something went wrong please login again"
    });
  }
} else {
  return res.status(401).json({
    data: "User not logged in"
  });
}
} catch (err) {
res.json({
  data: err
});
}

  };