// const mongoose=require('mongoose');

// const course=new mongoose.Schema(
//     {

//     }
// )
const mongoose=require('mongoose')
const courseSchema=new mongoose.Schema(
    {
        courseName:{
            type:String,
            required:true
        },
        duration:{
            type:String,
            required:true
        },
        Mode:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("course",courseSchema)