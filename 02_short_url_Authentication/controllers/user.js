const User = require("../models/user");
const {v4: uuidv4} = require("uuid")
const{setUser,getUser}=require('../service/auth')
async function handelUserSignup(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
}


async function handelUserLogin(req, res) {
  const { email, password } = req.body;
 const user= await User.findOne({ email, password });
 if(!user) return res.render("login",{
    error:"invalid email or password"
 })
//  const sessionId=uuidv4();
//  setUser(sessionId,user);
const token = setUser(user);
//  res.cookie("uid",sessionId);
res.cookie("token", token);
  return res.redirect("/");
// return res.json({token})
}



module.exports={
    handelUserSignup,
    handelUserLogin
}