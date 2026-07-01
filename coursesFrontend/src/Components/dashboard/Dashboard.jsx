



//------------------------Boot Strap Used here-----------------------------

import './dashboard.css';
import { useEffect, useState } from "react";
import FetchingCourses from "./FetchingCourses";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [searched, setSearched] = useState("");
    const [active, setActive] = useState("allCourses");
    const [type, setType] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token)
            navigate("/login");
    }, [navigate]);

    return (
        <div
            className="container-fluid min-vh-100"
            style={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)'
            }}
        >
            <div className="d-flex align-items-center justify-content-center w-100 mt-5 pt-4">
                <ul
                    className="d-flex flex-wrap justify-content-center list-unstyled gap-5 fs-4"
                    style={{ color: '#ffffff', fontWeight: '600' }}
                >
                    <li
                        className={active === "allCourses" ? 'activeButton' : 'inActiveButton'}
                        onClick={() => {
                            setActive("allCourses");
                            setType("");
                        }}
                    >
                        All Courses
                    </li>

                    <li
                        className={active === "webDevelopment" ? 'activeButton' : 'inActiveButton'}
                        onClick={() => {
                            setActive("webDevelopment");
                            setType("web");
                        }}
                    >
                        Web Development
                    </li>

                    <li
                        className={active === "dataScience" ? 'activeButton' : 'inActiveButton'}
                        onClick={() => {
                            setActive("dataScience");
                            setType("data");
                        }}
                    >
                        Data Science
                    </li>

                    <li
                        className={active === "AI/ML" ? 'activeButton' : 'inActiveButton'}
                        onClick={() => {
                            setActive("AI/ML");
                            setType("ai");
                        }}
                    >
                        AI/ML
                    </li>

                    <li
                        className={active === "promptEngineering" ? 'activeButton' : 'inActiveButton'}
                        onClick={() => {
                            setActive("promptEngineering");
                            setType("prompt");
                        }}
                    >
                        Prompt Engineering
                    </li>
                </ul>
            </div>

            <div className="container-fluid">
                {active === "allCourses" ? <FetchingCourses type={type} /> : ''}
                {active === "webDevelopment" ? <FetchingCourses type={type} /> : ''}
                {active === "dataScience" ? <FetchingCourses type={type} /> : ''}
                {active === "AI/ML" ? <FetchingCourses type={type} /> : ''}
                {active === "promptEngineering" ? <FetchingCourses type={type} /> : ''}
            </div>
        </div>
    );
}

export default Dashboard;