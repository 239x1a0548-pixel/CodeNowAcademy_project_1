const admin=require('../models/admin');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const register=async (req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        const adminUser= await admin.findOne({email:email});
        if(adminUser){
            return res.status(400).json({
                message:"Email Alraedy Exist"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newAdmin=new admin({
            fullName:fullName,
            email:email,
            password:hashedPassword
        });
        await newAdmin.save();
        res.status(200).json({
            message:"Admin Registered Successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"Registration Failed"
        })
    }
}

const login=async (req,res)=>{




    
    try{
        const {email,password}=req.body;
        const adminUser=await admin.findOne({email:email});
        if(!adminUser){
            return res.status(400).json({
                message:"Admin Not Found"
            });
        }
        const isMatch=await bcrypt.compare(password,adminUser.password);
        if(!isMatch){
            return res.send(400).json({
                message:"Invalid Email or Password.."
            });
        }
        const token=jwt.sign(
            {
                id:adminUser._id,
                email:email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'1hr'
            }
        );
        res.status(200).json({
            message:"Login Successful",
            token:token,
            admin:{
                id:adminUser._id,
                fullName:adminUser.fullName,
                email:email
            }
        });

    }catch(error){
        console.log(error.message)
        res.status(500).json({
            message:"Failed"
            
        });
    }
}

module.exports={login,register};