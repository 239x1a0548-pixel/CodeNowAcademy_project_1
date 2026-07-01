import axios from "axios";
import { useState,useEffect } from "react";

function Card({student}){
    return(
        <div style={{border:"1px solid black",margin:"10px"}}>
            <h1>FullName: {student.fullName}</h1>
            <h2>Email: {student.email}</h2>
            
        </div>
    )
}

function Students(){
    const [data,setData] =useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/api/getStudents")
        .then(response=>response.json())
        .then(result=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log("Error ",error);
        })
    },[]);
    return(
        <div>
            <h1>hello Students</h1>
            {data.map((student)=>{
                return <Card key={student._id} student={student}/>
            })}
        </div>
    )
}
export default Students;