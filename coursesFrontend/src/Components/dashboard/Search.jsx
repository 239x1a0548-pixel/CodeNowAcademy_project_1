import Card from "./Card";
import { useState, useEffect } from "react";
import axios from 'axios'
function Search({ value, data }) {
    const result = data.filter((data) => data.courseName.toLowerCase().includes(value.toLowerCase()))
    console.log("search was called")
    const [registeredData, setRegisteredData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('userData'))
                const studentRegistered = await axios.get("http://localhost:5000/course/getRegisteredCourses", { params: { id: user.id } })
                setRegisteredData(studentRegistered.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);

    function isRegistered(id) {
        return registeredData.some((c) => c._id === id)
    }
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}  className="d-grid gap-3">

            {
                result.map((course, index) => (
                    <Card c={course} isRegistered={isRegistered(course._id)} />
                ))
            }
        </div>
    )
} export default Search;