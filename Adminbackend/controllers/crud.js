const courses=require('../models/courses');

const getCourses=async (req,res)=>{
    try{
        const course=await courses.find();
        if(!course){
            return res.status(400).json({
                message:"failed to load courses"
            });
        }
        // res.status(200).json({
        //     message:"courses Loaded",
        //     courses:courses
        // })
        let cnt=course.length;
        res.status(200).json({
            message:"Success",
            data:course,
            count:cnt
        });
    }catch(error){
        console.log(error.message)
        res.status(400).json({
            message:"Failed to Get Courses"
        });
    }
}

const addCourse=async (req,res)=>{
    try{
        const {courseName,duration,Mode,type}=req.body;
        console.log(req.body);
        const exist=await courses.findOne({courseName,duration,Mode,type});
        if(exist){
            return res.status(400).json({
                message:"Course alredy Exist.."
            })
        }
        const newCourse=new courses(
            {
                courseName,
                duration,
                Mode:Mode,
                type
            }
        );
        
        await newCourse.save();
        
        res.status(200).json({
            message:"course Added"
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Failed to Add course"
        })
    }
}

const deleteCourse=async (req,res)=>{
    try{
        const {_id}=req.body;
        const course=await courses.findOne({_id});
        // console.log(course);
        await courses.findByIdAndDelete(_id);
        res.status(200).json({
        message:"course deleted"
    })
    }catch(error){
        res.status(400).json({
            message:"delete Failed"
        })
    }
}

const editCourse=async (req,res)=>{
    try{
        const {_id,courseName,duration,Mode,type} =req.body;
        await courses.findByIdAndUpdate(_id,{courseName,duration,Mode,type});
        res.status(200).json({
            message:"Update Successfull"
        })
    }catch(error){
        res.status(400).json({
            message:"Edit Failed"
        })
    }
}

module.exports={getCourses,addCourse,deleteCourse,editCourse};