import {Link} from 'react-router-dom'
import{useState,useEffect} from 'react';
import axios from 'axios'
import HomeCourseCard from './HomeCourseCard'
function Content(){
  const[searching,setSearching]=useState("");
  const[searched,setSearched]=useState("");
  const[data,setData]=useState([]);
   useEffect(() => {
        const fetchData = async () => {
          try{
  
            const response = await axios.get(
                "http://localhost:5000/course/getAllCourses"
            )
            setData(response.data);
          }
        catch(error){
           alert(error.response.data.message);
        }
      }
          fetchData();
        },[])
    function Search({data,value}){
        const result=data.filter((data) => data.courseName.toLowerCase().includes(value.toLowerCase()))
       return(
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}  className="d-grid gap-3">

             {
                result.map((course,index) =>(
                  <HomeCourseCard c={course}/>
                ))
             }
           </div>
       )
    }
    return(
       <div>
         {/* ===== Top Header Bar: title + Login/Register on the same line ===== */}
         <div
           className="d-flex align-items-center justify-content-between px-4 py-3 shadow-sm"
           style={{
             background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
             color: "#fff",
             flexWrap: "wrap"
           }}
         >
           <h1
             className="m-0"
             style={{
               fontSize: "1.6rem",
               fontWeight: "700",
               whiteSpace: "nowrap"
             }}
           >
             Education Shouldn't Cost a Fortune. Ours Doesn't.
           </h1>

           <div className="d-flex gap-2 mt-2 mt-md-0">
             <button
               className="btn rounded-pill px-4 fw-semibold border-0"
               style={{ background: "#ff7e5f", color: "#fff" }}
             >
               <Link
                 to="/login"
                 style={{ color: "#fff", textDecoration: "none" }}
               >
                 Login
               </Link>
             </button>
             <button
               className="btn rounded-pill px-4 fw-semibold border-0"
               style={{ background: "#06d6a0", color: "#fff" }}
             >
               <Link
                 to="/register"
                 style={{ color: "#fff", textDecoration: "none" }}
               >
                 Register
               </Link>
             </button>
           </div>
          </div>

          {/* ===== Search Section (clean single combined pill) ===== */}
          {/* ===== Search Section (clean single combined pill) ===== */}
<div className="d-flex justify-content-center align-items-center mb-5 mt-5">
      <div
          className="d-flex align-items-center"
          style={{
              maxWidth: "600px",
              width: "100%",
              height: "52px",
              borderRadius: "999px",
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              padding: "0 6px 0 20px"
          }}
      >
          <span style={{ fontSize: "1.1rem", color: "#9a9a9a", marginRight: "10px" }}>
              🔍
          </span>
          <input
    type="text"
    placeholder="Search courses..."
    id="user-dashboard-search-field"
    style={{
        flex: 1,
        height: "40px",
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        padding: "0",
        margin: "0",
        lineHeight: "40px",
        verticalAlign: "middle",
        boxShadow: "none"
    }}
    onChange={(e) => setSearching(e.target.value)}
/>
          <button
              className="fw-semibold border-0"
              style={{
                  background: "#4e54c8",
                  color: "#fff",
                  height: "40px",
                  padding: "0 24px",
                  borderRadius: "999px",
                  fontSize: "0.9rem"
              }}
              onClick={()=>setSearched(searching)}
          >
              Search
          </button>
      </div>
  </div>

              {/* ===== Course Cards Grid ===== */}
              <div className="row mt-4 px-3">
                {searched.length === 0 || searching.length===0
                    ? data.map((course, index) => (
                        <div
                            key={index}
                            className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                            <HomeCourseCard
                                c={course}
                            />
                        </div>
                    ))
                    : <Search data={data} value={searched} />
                }
            </div>
       </div>
    )    
}export default Content;