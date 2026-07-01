



//----------------------BootStrap css used---------


import { useEffect, useState } from 'react';
import axios from 'axios';
function HomeCourseCard({c}) {
    const [count, setCount] = useState(0);
    const[toast,setToast]=useState(false)
    const[message,setMessage]=useState("")
    
     function handleToast(){
        setToast(true);
        setTimeout(()=>setToast(false),4000)
     }
    

    useEffect(() => {
        async function countRegisteredStudents(id) {
            try {
                const response = await axios.get(
                    "http://localhost:5000/course/getCountOfStudents?id=" + id
                );
                setCount(response.data.count);
            }
            catch (error) {
                console.log(error);
            }
        }

        countRegisteredStudents(c._id);
    }, [c._id]);

    return (
        <div
            className="card shadow-lg border-0 h-100 m-3"
            id={c._id}
            style={{
                borderRadius: "15px",
                background: "linear-gradient(145deg, #ffffff, #f1f5ff)"
            }}
        >
            <div className="card-body p-4">

                <h5 className="card-title mb-3 fw-bold text-primary">
                    {c.courseName}
                </h5>

                <p className="card-text mb-2">
                    <strong>Duration:</strong> {c.duration}
                </p>

                <p className="card-text mb-2">
                    <strong>Mode:</strong> {c.Mode}
                </p>

                <p className="card-text mb-4">
                    <strong>Students Registered:</strong>{" "}
                    <span className="badge bg-info text-dark">
                        {count}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default HomeCourseCard;