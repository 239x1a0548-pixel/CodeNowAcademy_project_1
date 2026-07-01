import { useEffect, useState } from "react";

function Card({course}){
    return(
        <div style={{border:"1px solid black",margin:"10px"}}>
            <h2>CourseName: {course.courseName}</h2>
            <h2>Duration: {course.duration}</h2>
            <h2>Mode:{course.Mode}</h2>
            
            
        </div>
    )
}

function TempCourses(){
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/api/courses")
        .then(response=>response.json())
        .then(result=>{
            setCourses(result.data)
        })
        .catch((error)=>{
            console.log("Fetch Failed",error);
        })
    },[]);
    return(
        <div>
            <h1>Our Courses</h1>
            {
                courses.map((course,index)=>{
                    return <Card key={index} course={course} />
                })
            }
        </div>
    )
}
export default TempCourses;