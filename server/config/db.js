const mongoose= require('mongoose');

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Mongodb connected');

    }catch(error){
        console.error(`Error: ${errror.message}`)
        process.exit(1);

    }
}

module.exports=connectDB;