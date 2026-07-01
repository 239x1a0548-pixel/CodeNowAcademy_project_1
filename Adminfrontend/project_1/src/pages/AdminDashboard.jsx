// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios"


function Card({ title, cnt }) {
    return (
        <div className="card shadow" style={{ width: "30%", textAlign: "center" }}>
            <p>{title}</p>
            <h2>{cnt}</h2>
        </div>
    )
}
function AdminDashboard() {

function StudentRow({ student }) {
    let date = new Date(student.createdAt);
    date = date.toLocaleDateString();
    return (
        <tr>
            <td>{student.fullName}</td>
            <td>{student.email}</td>
            <td>{date}</td>
            <td id={student._id}>
                {/* <button className="btn btn-outline-primary btn-sm w-50" onClick={()=>handleEditstudent(student._id)}>
                    <i className="bi bi-pencil"></i>
                </button> */}
                <button className="btn btn-outline-danger btn-sm w-50" onClick={()=>handleDeleteStudent(student._id)}>
                    <i className="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
    )
}
function CourseRow({ course }) {
    return (
        <tr>
            <td>{course.courseName}</td>
            <td>{course.duration}</td>
            <td>{course.Mode}</td>
            <td>{course.type}</td>
            <td id={course._id}>
                {/* <button className="btn btn-outline-primary btn-sm w-50" onClick={()=>handleEditCourse(course._id)}>
                    <i className="bi bi-pencil-square"></i>
                </button> */}
                <button className="btn btn-outline-danger btn-sm" onClick={()=>handleDeleteCourse(course._id)}>
                    <i className="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
    )
}


    // const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrolls, setEnrolls] = useState([]);
    const [studentsCnt, setStudentCnt] = useState(0);
    const [courseCnt, setCourseCnt] = useState(0);
    const [enrollCnt, setEnrollCnt] = useState(0);
    // const [deleteStudent,setDeleteStudent] =useState("");
    const [addCourse, setAddCourse] = useState(false); 
    const [newCourse, setNewCourse] = useState({
        courseName: "",
        duration: "",
        Mode: "Online", 
        type: "Technical" 
    });
    const [addStudent,setAddStudent] =useState(false);
    const [newStudent,setNewStudent]=useState({
        fullName:"",
        email:"",
        password:""
    });
    const [searchCourse,setSearchCourse]=useState("");
    const [searchStudent,setSearchStudet]=useState("");
    const fetchCourses=async ()=>{
        await fetch("http://localhost:5000/api/courses")
            .then(response => response.json())
            .then(result => {
                setCourses(result.data);
                setCourseCnt(result.count);
            })
            .catch((error) => {
                console.log("courses loading Failed..",error)
            })
    }
    useEffect(() => {
        fetchCourses();
    }, []);
    const handleAddCourse = async (e) => {
        e.preventDefault(); 
        try {
            
            const course={courseName:newCourse.courseName,
                duration:newCourse.duration,
                Mode:newCourse.Mode,
                type:newCourse.type
            }
            const response = await axios.post("http://localhost:5000/api/addCourse", course);
            
            if (response.status === 201 || response.status === 200) {
                alert("Course Added Successfully!");
                setAddCourse(false);
                
                setNewCourse({ courseName: "", duration: "", Mode: "Online", type: "Technical" }); 
                
                fetchCourses(); 
            }
        } catch (error) {
            console.error("Error adding course:", error);
            alert("Failed to add course. Check your backend console.");
        }
    };
    const handleDeleteCourse=async (id)=>{
        if(window.confirm("Are you confirm to delete course")){
            try{
                await axios.delete("http://localhost:5000/api/deleteCourse",{data:{_id:id}});
                fetchCourses();
            }catch(error){
                console.log("error to delete course.",error)
            }
        }
    }
    // const [editCourse,setEditCourse]=useState(false);
    // const handleEditCourse=async (id)=>{
    //     setEditCourse(true);
    //     // try{
    //     //     const course=await axios.get('http://localhost:5000/')
    //     // }
    //     let course= courses.find(i=>i._id==id);
    //     setNewCourse({
            
    //     })
    // }
    const fetchStudents= async ()=>{
        await fetch("http://localhost:5000/api/getStudents")
            .then(response => response.json())
            .then(result => {
                setStudents(result.data);
                setStudentCnt(result.count);
            })
            .catch((error) => {
                console.log("students loading Failed..",error)
            })
    }
    useEffect(() => {
        fetchStudents();
        
    }, []);
    const handleDeleteStudent=async (id)=>{
        if(window.confirm("Are you confirm to delete Student...?")){
            try{
                await axios.delete("http://localhost:5000/api/deleteStudent",{
                    data:{_id:id}
                });
                fetchStudents();
            }catch(error){
                console.log("delete failed",error);
            }
        }
    }
    const handleAddStudent=async (e)=>{
        e.preventDefault();
        try{
            const student={
                fullName:newStudent.fullName,
                email:newStudent.email,
                password:newStudent.password,
                confirmPassword:newStudent.password
            }
            const response=await axios.post("http://localhost:5000/api/adminAddStudent",student);
            if(response.status==200||response.status==201){
            setNewStudent({
                fullName:"",
                email:"",
                password:""
            });
            setAddStudent(false);
            fetchStudents();
        }
        }catch(error){
            console.log("student register failed",error);
        }
    }
    useEffect(() => {
        fetch("http://localhost:5000/api/studentCourses")
            .then(response => response.json())
            .then(result => {
                setEnrolls(result.data);
                setEnrollCnt(result.count);
            })
            .catch((error) => {
                console.log("enrolls loading Failed..", error)
            })
    }, []);

    
    {if(addCourse) return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)",width:"100%" }}>
            <div className="modal-dialog modal-dialog-centered d-block " >
                <div className="modal-content d-block p-4">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Course</h5>
                        <button type="button" className="btn-close" onClick={() => setAddCourse(false)}></button>
                    </div>
                    <form onSubmit={handleAddCourse} className="d-block w-100">
                    
                            
                                <label className="form-label">Course Name</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Enter Course Name.."
                                    required
                                    value={newCourse.courseName}
                                    onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})}
                                />
                                <br/>
                            
                                <label className="form-label">Duration</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="e.g. 3 Months"
                                    required
                                    value={newCourse.duration}
                                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                                />
                                <br/>
                            
                                <label className="form-label">Mode</label>
                                <select 
                                    className="form-select"
                                    value={newCourse.Mode}
                                    onChange={(e) => setNewCourse({...newCourse, Mode: e.target.value})}
                                >
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                                <br/>
                            
                                <label className="form-label">Type</label>
                                <input 
                                    className="form-control"
                                    value={newCourse.type}
                                    onChange={(e) => setNewCourse({...newCourse, type: e.target.value})}
                                >
                                    
                                </input>
                                <br/>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setAddCourse(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Course</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )}
    if(addStudent){
        return(
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)",width:"100%" }}>
            <div className="modal-dialog modal-dialog-centered d-block " >
                <div className="modal-content d-block p-4">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Student</h5>
                        <button type="button" className="btn-close" onClick={() => setAddStudent(false)}></button>
                    </div>
                    <form onSubmit={handleAddStudent} className="d-block w-100">
                    
                            
                                <label className="form-label"> fullName</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    required
                                    placeholder="Enter Your Name..."
                                    value={newStudent.fullName}
                                    onChange={(e) => setNewStudent({...newStudent, fullName: e.target.value})}
                                />
                                <br/>
                            
                                <label className="form-label">email</label>
                                <input 
                                    type="email" 
                                    className="form-control"
                                    placeholder="Enter your Email..." 
                                    required
                                    value={newStudent.email}
                                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                                />
                                <br/>
                            
                                <label className="form-label">Password</label>
                                <br/>
                                <input
                                    type="password"
                                    value={newStudent.password}
                                    placeholder="Enter your passwords"
                                    required
                                    onChange={(e)=>setNewStudent({...newStudent,password:e.target.value})}
                                >

                                </input>
                                {/* <input 
                                    className="form-control"
                                    type="password"
                                    required
                                    value={newStudent.password}
                                    onChange={(e) => setNewStudent({...newStudent, Mode: e.target.value})}
                                >
                                </input> */}
                                <br/>
                            
                                {/* <label className="form-label">Type</label>
                                <input 
                                    className="form-select"
                                    value={newCourse.type}
                                    onChange={(e) => setNewCourse({...newCourse, type: e.target.value})}
                                >
                                    
                                </input>
                                <br/> */}
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setAddStudent(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Register Student</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className="bootstrap-scope p-4" style={{ width: "100%" }}>
            {/* <h1>This is Admin Dashboard</h1>
            <button onClick={()=>{navigate('/admindashboard/students')}}>Get Students</button>
            <button onClick={()=>{navigate('/adminDashboard/courses')}}>Get Courses</button> */}
            <div className="d-flex justify-content-between" >
                <Card title="Total Students:" cnt={studentsCnt} />
                <Card title="Total Courses:" cnt={courseCnt} />
                <Card title="Total Enrollments:" cnt={enrollCnt} />
                {/* <Card title="Total Students:" cnt="10" /> */}
            </div>
            <div className="d-flex justify-content-between mt-4">
                <div className="students card p-2" style={{ width: "48%" }}>
                    <div className="head d-flex justify-content-between">
                        <h2>Students</h2>
                        <button className="btn btn-md bg-primary w-25" onClick={()=>setAddStudent(true)} >+ Add Student</button>
                    </div>
                    <input className="search w-50 mb-4" type="text" placeholder="Search Student..." value={searchStudent} onChange={(e)=>setSearchStudet(e.target.value)} />
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Registered On</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {students.map((student, index) => {
                                return <StudentRow key={index} student={student} />
                            })} */}
                            {students
                    .filter((student) => {
                        // Returns true if search query matches courseName, Mode, or type
                        const query = searchStudent.toLowerCase();
                        return (
                            student.fullName?.toLowerCase().includes(query) ||
                            student.email?.toLowerCase().includes(query)
                            
                        );
                    })
                    .map((student, index) => {
                        return <StudentRow key={student._id || index} student={student} />;
                    })
                }
                        </tbody>
                    </table>
                </div>
                <div className="courses card p-2" style={{ width: "48%" }}>
                    <div className="head d-flex justify-content-between">
                        <h2>Courses</h2>
                        <button className="btn btn-md bg-primary w-25" onClick={()=>setAddCourse(true)}>+ Add Course</button>
                    </div>
                    <input className="search w-50 mb-4" type="text" placeholder="Search Courses..." value={searchCourse} onChange={(e)=>setSearchCourse(e.target.value)}/>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>CourseName</td>
                                <td>Duration</td>
                                <td>Mode</td>
                                <td>Type</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {courses.map((course, index) => {
                                return <CourseRow key={index} course={course} />
                            })} */}
                            {courses
                    .filter((course) => {
                        // Returns true if search query matches courseName, Mode, or type
                        const query = searchCourse.toLowerCase();
                        return (
                            course.courseName?.toLowerCase().includes(query) ||
                            course.Mode?.toLowerCase().includes(query) ||
                            course.type?.toLowerCase().includes(query)
                        );
                    })
                    .map((course, index) => {
                        return <CourseRow key={course._id || index} course={course} />;
                    })
                }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
export default AdminDashboard;

