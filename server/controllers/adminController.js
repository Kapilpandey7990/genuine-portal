const Admin= require('../models/admin')
const jwt= require('jsonwebtoken')

exports.adminlogin = async(req,res) =>{
    const {username, password} = req.body;
    try{
        const admin = await Admin.findOne({username});
        if(!admin){
            res.status(400).json({message:"Invalid credentials"})
        }
        const isMatch = await admin.comparePassword(password);
        if(!isMatch){
            res.status(400).json({message:"Invalid credentials"})
        }
        //generate token
        const token = jwt.sign({id:admin._id,isAdmin:true},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.redirect('/pages/admin.html')
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}