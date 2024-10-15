const { response } = require('express');
const jwt=require('jsonwebtoken');

exports.protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({message:"Not authorized , no token"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded.isAdmin){
            return res.status(403).json({message:"Not authorized"})
        }
        req.admin=decoded;
        next();
    }catch(error){
        return res.status(401).json({message:"Token is not valid"})
    }
};