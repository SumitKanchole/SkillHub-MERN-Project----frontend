import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgetPassword.css';
// import Header from '../Header/header';
import { toast, ToastContainer } from 'react-toastify';
// import EndPoint from '../../Apis/EndPoint';
import EndPoint from '../../Apis/EndPoint';


function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Simple client-side validation
    if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
      return toast.error("Please fill all fields!");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const res = await axios.post(EndPoint.ForgetPassword, formData);
      toast.success(res.data.message); // Show success toast
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <ToastContainer/>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-10 col-lg-10 shadow-lg rounded-4 overflow-hidden p-0">
            <div className="row g-0">

              {/* Left Image */}
              <div className="col-lg-6 d-none d-lg-block">
                <img
                  src="assets/Login.jpg"
                  alt="Login visual"
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>

              {/* Form Section */}
              <div className="col-12 col-lg-6 bg-light-green d-flex align-items-center">
                <div className="w-100 p-4 p-md-5">
                  <span>
                    <Link to='/'>
                      <i className="bi bi-arrow-left-circle link-success" style={{ fontSize: "28px" }}></i>
                    </Link>
                  </span>
                  <h2 className="text-center text-color mb-4 fw-bold">Forget Password</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control input-custom"
                        placeholder="Enter your Email..."
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control input-custom"
                        placeholder="Enter your Password..."
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control input-custom"
                        placeholder="Confirm your Password..."
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="d-grid mb-3">
                      <button
                        type="submit"
                        className="btn btn-color rounded-pill text-uppercase fw-bold py-2"
                      >
                        Update Password
                      </button>
                    </div>

                    <p className="text-center mt-3">
                      Back to{' '}
                      <Link to="/login" className="text-primary text-decoration-none">
                        Login
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

export default ForgetPassword;
