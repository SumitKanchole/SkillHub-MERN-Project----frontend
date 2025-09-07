// components/Header/header.js
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { getCurrentUser, isUserExist } from "../Auth/Auth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import EndPoint from "../../Apis/EndPoint";

function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [Profile, setProfileImage] = useState('/assets/user.png');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = getCurrentUser();
    if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const handleSignOut = async(event) => {
    try {
      let logout = await axios.delete(EndPoint.LOGOUT, { withCredentials: true });
      console.log(logout);
      
      sessionStorage.setItem("current-user","");
      sessionStorage.clear();
      navigate("/");
      
    } catch (err) {
      console.log(err);
      toast.error("Oops! Something went wrong");
    }
  }

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  return  <>
      <ToastContainer/>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm" style={{background:"linear-gradient(360deg, #006503, #019f01)"}}>
        <div className="container">
          <a className="navbar-brand fw-bold text-white" href="/">SkillHUB<span style={{ color: "#D1F40C" }}>.</span><span style={{ color: "#92E49E" }}>com</span><p style={{fontSize:"10px", fontWeight:"lighter",color:"#fdf748b4"}}>skill exchange platform</p></a>
          
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleNavbar}
          >
            {!isOpen ? (
              <span className="navbar-toggler-icon navbar-light"></span>
            ) : (
              <span className="fs-2 fw-bold text-white">&times;</span>
            )}
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white table-hover ml-2 navigate-design" to="/" onClick={closeNavbar}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white ml-2 navigate-design" to="/about" onClick={closeNavbar}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white ml-2 navigate-design" to="/contact" onClick={closeNavbar}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white ml-2 navigate-design" to="/connect" onClick={closeNavbar}>Connect</Link>
              </li>
              

              <li className="nav-item">
                {!isUserExist() && (
                  <Link 
                    to="/Login" 
                    className="nav-link text-white ml-2 mt-0 text-center" 
                    style={{ backgroundColor: "#369A22", borderRadius: "18px", width: "139px", height: "38px" }} 
                    onClick={() => setIsOpen(false)}
                  >
                    LogIn
                  </Link>
                )}
              </li>
              <li className="nav-item ml-2">
                {!isUserExist() && (
                  <Link  
                    to="/ragister" 
                    className="nav-link text-white text-center" 
                    style={{backgroundColor:"#369A22",borderRadius:"18px",width:"139px", height:"38px"}} 
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                )}
              </li>
              <li className="nav-item ml-2">
                {isUserExist() && (
                  <label 
                    className="nav-link text-white text-center logout-btn" 
                    style={{borderRadius:"18px",width:"139px", height:"38px",cursor:"pointer"}} 
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </label>
                )}
              </li>

                {isUserExist() && (
                  <li className="nav-item dropdown ms-3 position-relative">
                    <img
                      className="ml-2"
                      src={Profile}
                      width="40px"
                      height="40px"
                      onClick={toggleProfileDropdown}
                      style={{ borderRadius: "50%", cursor: "pointer" }}
                      alt="user" 
                    /> 

                    {showProfileDropdown && (
                      <ul
                        className="dropdown-menu show mt-2"
                        style={{
                          left: 'auto',
                          right: 0,
                          position: 'absolute',
                          top: '50px',
                          zIndex: 999,
                        }}
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/profile"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            Manage Profile
                          </Link>
                        </li>
                        <li>
                          <button className="dropdown-item text-danger" onClick={handleSignOut}>
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                )}
            </ul>
          </div>
        </div>
      </nav>
    </>
};

export default Header;