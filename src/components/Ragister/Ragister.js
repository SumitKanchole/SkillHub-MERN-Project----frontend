import { Link, useNavigate } from 'react-router-dom';
import './Ragister.css';
import { useState } from 'react';
import axios from "axios";
import EndPoint from '../../Apis/EndPoint';
import { toast, ToastContainer } from "react-toastify";
function Ragister() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword:""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlesubmit = async (event) => {
    let response;
    try {
      event.preventDefault();
      setIsLoading(true);
      response = await axios.post(EndPoint.SIGN_UP, state);
      toast.success(response.data.message);
      setState({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword:""
      });
      navigate("/Login");

    }
    catch(err){
      // console.log(err);
      toast.error("Oop! something went wrong....");
      // toast.error(err.response.data.message);
      
    }
    setIsLoading(false);
  }



    return <>
      <ToastContainer/>
    <div className="container py-5">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-10 col-lg-10 shadow-lg rounded-4 overflow-hidden p-0">
          <div className="row g-0">
            
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="assets/Login.jpg"
                alt="Register visual"
                className="img-fluid h-100 w-100 object-fit-cover"
              />
            </div>

            
            <div className="col-12 col-lg-6 bg-light-green d-flex align-items-center">
                <div className="w-100 p-4 p-md-5">
                    <span><Link to='/'><i className="bi bi-arrow-left-circle mt-0 link-success" style={{ fontSize: "28px" }}></i></Link></span>
                    {isLoading? <div className='spinner-border spinner-position'></div>:""}
                <h2 className="text-center text-color mb-4">Create an account</h2>
                <form onSubmit={handlesubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input defaultValue={state.name} onChange={(event)=>setState({...state,name:event.target.value})}
                      type="text"
                      className="form-control input-custom"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input defaultValue={state.email} onChange={(event)=>setState({...state,email:event.target.value})}
                      type="email"
                      className="form-control input-custom"
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input defaultValue={state.contact} onChange={(event)=>setState({...state,contact:event.target.value})}
                      type="text"
                      className="form-control input-custom"
                      placeholder="Enter contact number"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label visible">Password</label>
                    <input defaultValue={state.password} onChange={(event)=>setState({...state,password:event.target.value})}
                      type="password"
                      className="form-control input-custom"
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input defaultValue={state.confirmPassword} onChange={(event)=>setState({...state,confirmPassword:event.target.value})}
                      type="password"
                      className="form-control input-custom"
                      placeholder="Confirm password"
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-color rounded-pill text-uppercase fw-bold"
                    >
                      Register
                    </button>
                  </div>

                  <p className="text-center">
                    Already have an account?{' '}
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
}

export default Ragister;
