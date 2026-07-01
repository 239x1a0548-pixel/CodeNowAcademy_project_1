const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcryptjs');

const jwt=require('jsonwebtoken');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MonogoDB connected successfully");
}).catch((error)=>{
    console.log("MongoDB connection Failed",error);
})

app.get("/",(req,res)=>{
    res.send("Backend running successfully..")
});

const routes=require('./routers/authRoutes');

app.use('/api',routes);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT}`);
})