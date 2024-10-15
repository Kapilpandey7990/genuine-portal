const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminData = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{  
        type:String,
        required:true,
    }

});

adminData.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

adminData.methods.comparePassword=function(password){
    return bcrypt.compare(password, this.password);
}


module.exports=mongoose.model('Admin',adminData)