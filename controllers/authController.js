const jwt = require("jsonwebtoken"); // install krle json web token
const KEY = require("../configs/config").KEY; //is folder mein key bana le configs ke
const userModel = require("../models/userModel");
module.exports.signup = async function(req, res) {
  // 1. create user
  const user = await userModel.create(req.body);
  // 2. payload
  const id = user["_id"];
  //jwt.sign
  const token = await jwt.sign({ id }, KEY);
  res.cookie("jwt", token, { httpOnly: true });

  // console.log(res.cookie);
  res.status(201).json({
    result: "User  Created ",
    user,
    token
  });
};
module.exports.login = async function(req, res) {
  // 1. create user
  console.log(req.body);
  try {
    const user = await userModel.findOne({ phone: req.body.phone,password: req.body.password });
    console.log(user);
    if (user) {
      // 2. payload
      const id = user["_id"];
      const token = await jwt.sign({ id }, KEY);
      res.cookie("jwt", token, { httpOnly: true });
      // console.log(res.cookie);

      return res.status(201).json({
        result: "User  loggedIn",
        user
      });
    } else {
      res.status(201).json({
        result: "Wrong Credentials"
      });
    }
    //jwt.sign
  } catch (err) {
    console.log(err);
  }
};

module.exports.logout = function(req, res) {
  // res.cookie()
  res.cookie("jwt", "d,kjbzsdkfbj", {
    httpOnly: true,
    expires: new Date(Date.now())
  });
  // home page
  res.redirect("/");
};
module.exports.protectRoute = async function(req, res, next) {
  // console.log(req.cookie);
  const token = req.cookies
    ? req.cookies.jwt
    : null || req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  console.log(token);
  try {
    if (token) {
      const ans = await jwt.verify(`${token}`, KEY);
      console.log(ans);

      if (ans) {
        const user = await userModel.findOne({ _id: ans.id });
        req.role = user.role;
        req.user = user;
        req.body.phone = user.phone;
        req.body.seller = user["_id"];
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
