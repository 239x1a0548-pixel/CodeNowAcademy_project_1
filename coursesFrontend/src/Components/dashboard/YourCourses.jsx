


//-------------------------------------------BootStrap Used Here--------------------


import { useEffect, useState } from "react"
import axios from 'axios'
import Search from "./Search"
import ShowToast from "../ShowToast"

function Card({ c }) {
    const [toast, setToast] = useState(false);
    const [message, setMessage] = useState("");

    async function handleUnregister(course_id) {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const user_id = userData.id;
            const data = { user_id: user_id.toString(), course_id: course_id };
            const response = await axios.post("http://localhost:5000/course/unRegister", data);
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Something went wrong");
            console.log(error);
        }
    }

    return (
        <div className="card border-0 shadow-lg h-100 rounded-4">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title fw-bold text-primary mb-0">
                        {c.courseName}
                    </h5>
                    <span className="badge bg-info text-dark px-3 py-2 rounded-pill">
                        {c.Mode}
                    </span>
                </div>

                <hr />

                {/* Flex row for Duration + Button */}
                <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text fs-6 mb-0">
                        <strong>Duration:</strong> {c.duration}
                    </p>
                    <button
                        className="btn btn-danger btn-sm rounded-pill px-3"
                        onClick={() => { handleUnregister(c._id); setToast(true); }}
                    >
                        Un Register
                    </button>
                </div>
            </div>
            {toast ? <ShowToast toast={toast} message={message} /> : ""}
        </div>
    );
}


function YourCourses() {
    const [data, setData] = useState([])
    const [searched, setSearched] = useState("")

    useEffect(() => {
        async function fetchData() {
            const user = localStorage.getItem('userData')
            if (!user) {
                console.log("User data not stored")
                return;
            }
            try {
                const user_data = JSON.parse(user);
                const user_id = user_data.id;
                console.log(user_id)
                const user_id_details = { id: user_id }
                const response = await axios.get(
                    "http://localhost:5000/course/getRegisteredCourses",
                    { params: { id: user_id } }
                );
                setData(response.data)
                console.log(data)
            }
            catch (error) {
                alert(error.response.data.message)
            }
        }
        fetchData()
    }, [])

    function searchHadler(value) {
        setSearched(value)
    }

    return (
        <div
            className="min-vh-100 py-5"
            style={{
                     background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)'
            }}
        >
            <div className="container">
    
                <h2 className="text-center fw-bold text-white mb-4">
                    My Courses
                </h2>
    
                <div className="d-flex justify-content-center mb-5">
                    <input
                        type="text"
                        placeholder="🔍 Search Courses..."
                        id="user-dashboard-search-field"
                        className="form-control shadow-sm rounded-pill px-4"
                        style={{
                            maxWidth: "700px",
                            height: "55px"
                        }}
                        onInput={(e) => searchHadler(e.target.value)}
                    />
                </div>
    
                <div className="row g-4">
                    {searched.length === 0
                        ? data.map((course, index) => (
                            <div
                                key={index}
                                className="col-lg-4 col-md-6 col-sm-12"
                            >
                                <Card c={course} />
                            </div>
                        ))
                        : <Search data={data} value={searched} />
                    }
                </div>
    
            </div>
        </div>
    )
}

export default YourCourses