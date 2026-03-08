require("dotenv").config();
const jwt = require("jsonwebtoken");
// const sessionIdToUserMap = new Map(); usd for statefull authentication where we store the data or this id in our server but id stateless authentation we store the data in the same token that we give to user with a secret key by which we only the person have that key can make the token its like special signature
const secret = process.env.secret;
function setUser(user) {
  // sessionIdToUserMap.set(id,user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
  );
}

// function getUser(id){
//    return sessionIdToUserMap.get(id);
// }

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
