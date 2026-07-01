const User=require('../models/User');
const Register =require('../models/Register');
const bcrypt =require('bcryptjs');

const getStudents= async (req,res)=>{
    try{
        const students=await User.find();
        let cnt=students.length;
        res.status(200).json({
            message:"success",
            data:students,
            count:cnt
        })
    }catch(error){
        res.status(400).json({
            message:"Failed"
        })
    }
}

const deleteStudent=async (req,res)=>{
    try{
        const {_id}=req.body;
        await User.findByIdAndDelete(_id);
        res.status(200).json({
            message:"student deleted"
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"student delete Failed"
        })
    }
}

const studentCourses=async (req,res)=>{
    try{
        // const {_id}=req.body;
        const students=await User.find();
        let studentCourse=[];
        let cnt=0;
        for(let student of students){
            let one=await Register.find({user:student._id});
            studentCourse.push(one);
            cnt+=one.length;
        }
        // const courses=await Register.find({user:_id});
        res.status(200).json({
            message:"Fetch Success",
            data:studentCourse,
            count:cnt
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Fetch Failed"
        })
    }
}

const adminAddStudent=async (req,res)=>{
    try{
        const {fullName,email,password,confirmPassword}=req.body;
        // console.log(req.body);
        const user=await User.findOne({email:email});
        if(user){
            res.status(500).json({
                message:"email is alraedy registered"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            fullName,
            email,
            password:hashedPassword,
            confirmPassword:hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            message:"student registered successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"student register Failed"
        })
    }
}
module.exports={getStudents,deleteStudent,studentCourses,adminAddStudent};