const jwt = require("jsonwebtoken");
const createError = require("./error")

const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authinticated!"));
    }

    jwt.verify(token, process.env.JWT, (err,user)=>{
        if(err) return next(createError(403,"Token is not valid!"))
        req.user = user;   //If the token is valid, the user object is extracted from the token (user), and it is assigned to req.user.
                           // This allows other middleware or route handlers to access the authenticated user's information if needed.
        next(); 
    })
}


const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}


const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}

module.exports = {verifyToken, verifyUser, verifyAdmin};