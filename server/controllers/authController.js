const User = require('../models/user');

//handle signup 
exports.signup = async(req,res) =>{
    try{
        
        const {name, email, password, confirmPassword} = req.body;
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({message:"all fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:'password not matched'});
        }


        const existingUser= await User.findOne({ email });
        if (existingUser){
            res.status(400).json({message:"user already registered"})
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/pages/login.html');
        

    }catch(error){
        console.log('signup error',error);
        if(!res.headerSent){

            res.status(500).json({message:"Server Error"})
        }
    }
};

//handle login 
exports.login = async(req,res) =>{
    try{
        const { email, password } = req.body;

        if(!email || !password){
            res.status(400).json({message:"All fields are required"})
        }

        //this will check that user exists or not
        const user= await User.findOne({ email });
        if (!user){
            return res.status(400).json({message:"Invalid email or password"})
        }

        //checking password is correct or not

        const isMatch = await user.comparePassword(password);
        
        if (!isMatch){
            return res.status(400).json({message:'invalid email or password'})
        }

        res.redirect('/pages/business.html')
    }catch(error){
        console.log('login error',error);
        if(!res.headerSent){
            res.status(500).json({message:'Server Error'})
        }
    }
}

