const cropModel= require("../models/cropModel")
const sendSMS= require("../utilities/SMS")
const axios = require("axios")


module.exports.getAllCrops = async function (req, res) {
    const originalQuery = { ...req.query };
    // console.log(originalQuery);

    //price[gt]=20&sort=geoLocation&page=2&limit=3
    // exclude special terms such as sort filter limit page
    var exArr = ["sort", "page", "limit", "select"];
    for (let i = 0; i < exArr.length; i++) {
        delete req.query[exArr[i]];
    }
    let str = JSON.stringify(req.query);
    str = str.replace(/gt|gte|lt|lte/g, function (match) {
        return str = "$" + match;
    });
    const data = JSON.parse(str);

    const {user}=req.body
    
    let crops = cropModel.find(data);
    if (originalQuery.sort) {
        var sortString = originalQuery.sort.split("%").join(" ");
        crops = crops.sort(sortString); // building of query 
    }
    if (originalQuery.select) {
        var selectString = originalQuery.select.split("%").join(" ");
        crops = crops.select(selectString);

        var limit = 4 || originalQuery.limit;
        var pageNumber = 1 || originalQuery.page;
        var startingIndex = (pageNumber - 1) * limit;
        crops = crops.limit(limit).skip(startingIndex);

        const finalAnswer = await crops; // executing of query when await is used
        res.json({ data:"hey the data" });
    }
}

module.exports.checkInput = function (req, res) {
    if (Object.keys(req.body).length == 0) {
        res.json("Please enter input");
    }
    next();
}

module.exports.addCrop =async function (req, res) {
    try{
    const crop = req.body;
    const newCrop = await cropModel.create(crop);
    res.json({newCrop});
    }

    catch(err){
        console.log(err);
        res.json(err);
    }
}

module.exports.deleteCrop= async function(req,res){
    const {id}=req.params;
    const deletedCrop=await cropModel.findByIdandDelete(id);
    res.json(deletedCrop);

}

module.exports.addCrop_sms=async function(req,res){
    // const {id}=req.body;
    try{
    var response=await axios.get('https://api.textlocal.in/get_messages?apikey=rtSIPeCdSgc-dZdRTusgnnMmqwk5F8F3FFkWyVXvR4&inbox_id=10')
//  console.log(response)
// console.log(response.data)
var arr=response.data.messages
var data=arr[arr.length-1]
console.log(data);
 const number=data.number
//  if(await farmerModel.find({phone:number-910000000000})){
//    const message=`You are not a registered farmer.Please register first on our portal FarmerConnect`
//     sendSMS(number,message)
//     res.json({
//         data:"not a registered user"
//     })
// }
data=data.message
data=data.split(" ");
const obj={
  name:data[1],
  price:data[2],
  quantity:data[3],
  description:data[4]
}
const crop=await cropModel.create(obj)
const message=`Your data has been saved successfully in our database`
sendSMS(number,message)
// const user=await farmerModel.find({number})
// console.log(user);
res.json({
   crop
})
}catch(err){
    console.log(err);
    const error_message=`Your data was not saved successfully in our database.Please try again`
    sendSMS(number,error_message)
    // console.log("error found")
    res.json({err})
}

}