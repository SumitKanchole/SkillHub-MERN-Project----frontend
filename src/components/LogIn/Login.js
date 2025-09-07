import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast,ToastContainer } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
// import EndPoint from '../../Apis/EndPoint';
import EndPoint from '../../Apis/EndPoint';
// import Header from '../Header/header';

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (state.email && state.password) {
        let response = await axios.post(EndPoint.LOGIN, state,{withCredentials:true});
        sessionStorage.setItem("current-user", JSON.stringify(response.data.user));
        toast.success(response.data.message);

        navigate("/");
      }
      else {
        toast.error("Please enter Email and Password...");
      }
    }
    catch (err) {
      toast.error(err.response.data.error);
    }
  }
  

  return (
    <>
      
      <ToastContainer />
      <div className="container py-5">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-10 col-lg-10 shadow-lg rounded-4 overflow-hidden p-0">
            <div className="row g-0">

              {/* Left Image - only visible on large screens */}
              <div className="col-lg-6 d-none d-lg-block">
                <img
                  src="assets/Login.jpg"
                  alt="Login visual"
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>

              {/* Right Form */}
              <div className="col-12 col-lg-6 bg-light-green d-flex align-items-center">
                <div className="w-100 p-4 p-md-5">
                  <span>
                    <Link to="/">
                      <i className="bi bi-arrow-left-circle link-success" style={{ fontSize: "28px" }}></i>
                    </Link>
                  </span>
                  <h2 className="text-center text-color mb-4 fw-bold">LOGIN</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input onChange={(event)=>setState({...state,email:event.target.value})}
                        type="text"
                        className="form-control input-custom"
                        placeholder="Enter your Username..."
                      />
                    </div>

                    <div className="mb-1">
                      <label className="form-label">Password</label>
                      <input onChange={(event)=>setState({...state,password:event.target.value})}
                        type="password"
                        className="form-control input-custom"
                        placeholder="Enter your Password..."
                      />
                    </div>

                    <div className="text-end mb-3">
                      <Link to="/forgot-password" className="text-primary text-decoration-none">
                        Forget password?
                      </Link>
                    </div>

                    <div className="d-grid mb-3">
                      <button
                        type="submit"
                        className="btn btn-color rounded-pill text-uppercase fw-bold py-2"
                      >
                        LOGIN
                      </button>
                    </div>


                    <div className="text-center mb-2 text-muted">OR</div>

        <div className="google-btn w-100 d-flex align-items-center justify-content-center">
          <img src="/assets/google.png" alt="Google logo" className="google-logo me-2" />
          <span>Continue with Google</span>
        </div>


                    <p className="text-center mt-3">
                      Don’t have an account?{' '}
                      <Link to="/ragister" className="text-primary text-decoration-none">
                        Ragister
                      </Link>
                    </p>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
