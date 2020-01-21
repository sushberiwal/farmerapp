const userModel = require("../models/userModel");
module.exports.userDetails = async function(req, res) {
  const { id } = req.params;
  const user = await userModel.find(id);
  res.json({ user });
};
module.exports.updateDetails = async function(req, res) {
  const { id } = req.params;
  const update = req.body;
  const updateduser = userModel.findByIdAndUpdate(id, update, { new: true });
  res.json({ updateduser });
};

module.exports.getAllUsers = async function(req, res) {
  const users = await userModel.find();
  res.json(users);
};
module.exports.addUser = async function(req, res) {
  const user = await userModel.create(req.body);
  res.json(user);
};
