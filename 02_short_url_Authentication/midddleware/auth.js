const {getUser}=require("../service/auth")

function CheckForAuthentication(req,res,next){
    // const authorizationHeaderValue = req.headers["authorization"];
     const tokencookie = req.cookies?.token;
    req.user=null;
    if (!tokencookie // || !authorizationHeaderValue.startsWith("Bearer ")
        )
      return next();
        // const token = authorizationHeaderValue.split("Bearer ")[1];
       const token = tokencookie;
       const user= getUser(token);

    req.user=user;
    next();
}


function restrictTo(roles){
    return function(req,res,next){
        if(!req.user ) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("unAuthorized")
        
            return next()
      
    }
}


// async function restrictToLoggedinUserOnly(req,res,next){
//     // const userUid=req.cookies?.uid;
//     const userUid = req.headers["authorization"];
//     if(!userUid) return res.redirect("/login")
//         const token = userUid.split("Bearer ")[1];
//     const user = getUser(userUid);
//     if(!user) return res.redirect("/login")
//     req.user=user;
//     next();
// }


// async function checkAuth(req,res,next){
//     //  const userUid=req.cookies?.uid;
//     const userUid = req.headers["authorization"];
//     const user = getUser(userUid);
  
//     req.user=user;
//     next();
// }

module.exports = {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  CheckForAuthentication,
  restrictTo
};