const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDBusers = await User.find({});
    return res.json(allDBusers);
}

async function handelGetUserById(req,res){
const user = await User.findById(req.params.id);
if (!user) {
  return res.status(404).json({ message: "User not found" });
}
return res.json(user);
}

async function handelUpdateUserById(req,res){
  await User.findByIdAndUpdate(req.params.id, {last_name: req.body.last_name});
  return res.json({status:"success"});
}

async function handelDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handelCreateNewUser(req, res) {
 const body = req.body;
 if (
   !body.first_name ||
   !body.last_name ||
   !body.email ||
   !body.jobTitle ||
   !body.gender
 ) {
   return res
     .status(400)
     .json({ message: "first name and last name are required" });
 }

 await User.create({
   first_name: body.first_name,
   last_name: body.last_name,
   email: body.email,
   jobTitle: body.jobTitle,
   gender: body.gender,
 });
 return res.status(201).json({ status: "success" });

}


module.exports = {
  handleGetAllUsers,
  handelGetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
  handelCreateNewUser,
};