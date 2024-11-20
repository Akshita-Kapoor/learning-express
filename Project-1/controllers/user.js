const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function getUserById(req, res) {
  const paramId = req.params.id;
  const user = await User.findById(paramId);
  if (!user) {
    return res.status(400).json({ error: "user nor found" });
  }
  return res.json(user);
}
async function updateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: "updated name",
  });
  return res.json({ status: "success" });
}
async function deleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"});
}
async function createNewUser(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email) {
        return res.status(400).json({msg: 'All fields are required.'});
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email:body.email
    })    
    return res.status(201).json({msg: "success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createNewUser
};
