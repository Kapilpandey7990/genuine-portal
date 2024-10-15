const express= require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes')
const connectDB = require('./config/db')
require('dotenv').config();

const app= express();

const PORT = process.env.PORT || 5000;

//rendering webpage
const staticPath = express.static(path.join(__dirname,"..","public"))
app.use(staticPath)


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes)

//connecting with database(mongodb)
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{console.log('MongoDb connected')})
.catch(err=> console.log("err"))

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})