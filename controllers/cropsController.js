const cropModel= require("../models/cropModel")


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
    
    let crops = buyerModel.find(data);
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
        res.json({ finalAnswer });
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

module.exports.addCrop_sms=function(req,res){
    const {id}=req.body;

}