
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const admin = { email, password };

    try {
      const response = await axios.post("http://localhost:5000/api/login", admin);
      const { message, token, admin: existAdmin } = response.data;

      if (message === "Login Successful") {
        alert("Logged in successfully");
        
        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(existAdmin));
        
        navigate("/adminDashboard");
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = error.response?.data?.message || "Login Failed";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center"
    style={{
      background:
        "linear-gradient(135deg, #0d6efd 0%, #4f8cff 50%, #eaf3ff 100%)",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">

          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.95)",
            }}
          >
            <div className="card-body p-5">

              
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle shadow"
                  style={{
                    width: "85px",
                    height: "85px",
                    background:
                      "linear-gradient(135deg,#0d6efd,#4f8cff)",
                  }}
                >
                  <i className="bi bi-shield-lock-fill text-white fs-1"></i>
                </div>

                <h2 className="fw-bold mt-3 text-primary">
                  Admin Login
                </h2>

                <p className="text-muted">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleLogin}>

               
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-envelope-fill text-primary"></i>
                    </span>

                    <input
                      type="email"
                      className="form-control py-2"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <a
                      href="#"
                      className="text-primary text-decoration-none small"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-lock-fill text-primary"></i>
                    </span>

                    <input
                      type="password"
                      className="form-control py-2"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Logging In...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
