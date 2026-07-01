



//-----------------------BootStrap Styling--------------------------

import './allCourses.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './Card'
import Search from './Search'

function FetchingCourses({ type }) {
    const [data, setData] = useState([])
    const [registeredData, setRegisteredData] = useState([])
    const [searched, setSearched] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('userData'))

            const response = await axios.get(
                "http://localhost:5000/course/getAllCourses"
            )

            const unfilteredData = response.data;

            if (type === "") {
                setData(unfilteredData);
            }

            const filteredData = unfilteredData.filter(
                (course) => course.type.toLowerCase() === type
            )

            if (type !== "")
                setData(filteredData)

            const studentRegistered = await axios.get(
                "http://localhost:5000/course/getRegisteredCourses",
                { params: { id: user.id } }
            )

            setRegisteredData(studentRegistered.data)
        }

        fetchData()
    }, [])

    function isRegistered(id) {
        return registeredData.some((c) => c._id === id)
    }

    function searchHadler(value) {
        setSearched(value)
    }

    return (
        <div
            className="container-fluid"
            style={{
                 background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)',height:'100%'
            }}
        >
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

            <div className="row mt-4">
                {searched.length === 0
                    ? data.map((course, index) => (
                        <div
                            key={index}
                            className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                            <Card
                                c={course}
                                isRegistered={isRegistered(course._id)}
                            />
                        </div>
                    ))
                    : <Search data={data} value={searched} />
                }
            </div>
        </div>
    )
}

export default FetchingCourses;