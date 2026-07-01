


//---------------------------------BootStrap css styling----------------------
import { NavLink } from 'react-router-dom';

function NavBar() {
  const linkStyle = ({ isActive }) => ({
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
    transition: 'all 0.25s ease'
  });

  const linkClass = ({ isActive }) =>
    `btn w-100 py-2 rounded-3 ${
      isActive
        ? 'btn-primary fw-bold shadow'
        : 'btn-outline-light'
    } text-center`;

  return (
    <div
      className="d-flex flex-column p-3 vh-100 gap-3 text-center position-sticky top-0"
      style={{
        width: '200px',
        background: 'linear-gradient(180deg, #0f172a, #1e293b)',
        color: '#fff',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '4px 0 15px rgba(0,0,0,0.3)'
      }}
    >
      {/* Increased Dashboard size */}
      <h2 className="fw-bold mb-5 text-info">
        Dashboard
      </h2>

      {/* Push items downward */}
      <div className="mt-4 d-flex flex-column gap-3">

        <NavLink
          to="/user/allCourses"
          end
          style={linkStyle}
          className={linkClass}
        >
          All Courses
        </NavLink>

        <NavLink
          to="/user/yourCourses"
          style={linkStyle}
          className={linkClass}
        >
          My Courses
        </NavLink>

        <NavLink
          to="/user/profile"
          style={linkStyle}
          className={linkClass}
        >
          Profile
        </NavLink>

        <NavLink
          to="/user/logout"
          style={linkStyle}
          className={linkClass}
        >
          Log Out
        </NavLink>

      </div>
    </div>
  );
}

export default NavBar;