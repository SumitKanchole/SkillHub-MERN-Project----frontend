
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import EndPoint from '../../Apis/EndPoint';
import { getCurrentUser } from '../Auth/Auth';
import './profile.css';
import Header from '../Header/header';

function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState("/assets/user.png");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setProfileImage(currentUser.profileImage || "/assets/user.png");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setProfileImage(base64Image);
      setUser((prev) => ({ ...prev, profileImage: base64Image }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${EndPoint.USER_PROFILE}/${user._id}`, user, {
        withCredentials: true,
      });

      sessionStorage.setItem("current-user", JSON.stringify(user));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      
      <div className="profile-wrapper">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              
              <div className="profile-main-card">
                
                {/* Profile Header Section */}
                <div className="profile-cover-section">
                  <div className="profile-cover-bg"></div>
                  
                  {/* Profile Image Container */}
                  <div className="profile-image-wrapper">
                    <div className="profile-image-container">
                      <img
                        src={profileImage || "/assets/user.png"}
                        alt="Profile"
                        className="profile-avatar"
                        onError={(e) => { e.target.src = "/assets/user.png"; }}
                      />
                      
                      {/* Edit Image Button */}
                      {editMode && (
                        <label className="image-edit-btn">
                          <i className="bi bi-camera-fill"></i>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Info Section */}
                <div className="profile-info-section">
                  <h3 className="profile-name">{user.name || "Your Name"}</h3>
                  <p className="profile-bio">{user.bio || "Your Bio"}</p>
                  
                  <button
                    type="button"
                    className={`btn ${editMode ? "btn-outline-danger" : "btn-primary"} btn-profile-edit`}
                    onClick={() => setEditMode(!editMode)}
                  >
                    <i className={`bi ${editMode ? "bi-x-lg" : "bi-pencil-square"} mr-2`}></i>
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                {/* Form Section */}
                {editMode ? (
                  <div className="profile-edit-section">
                    <div className="profile-form-container">
                      <h5 className="profile-form-title">
                        <i className="bi bi-person-gear mr-2"></i>
                        Update Profile Information
                      </h5>
                      
                      <div className="profile-form-wrapper" onSubmit={handleSubmit}>
                        <div className="row">
                          
                          {/* Full Name */}
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-person mr-2"></i>
                                Full Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control form-control-custom"
                                placeholder="Full Name"
                                value={user.name || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-envelope mr-2"></i>
                                Email Address
                              </label>
                              <input
                                type="text"
                                name="email"
                                className="form-control form-control-custom form-control-disabled"
                                placeholder="Email"
                                value={user.email || ""}
                                disabled
                              />
                            </div>
                          </div>

                          {/* Bio */}
                          <div className="col-12">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-chat-text mr-2"></i>
                                Bio
                              </label>
                              <textarea
                                name="bio"
                                className="form-control form-control-custom"
                                placeholder="Tell us about yourself..."
                                rows="3"
                                value={user.bio || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-telephone mr-2"></i>
                                Contact Number
                              </label>
                              <input
                                type="text"
                                name="contact"
                                className="form-control form-control-custom form-control-disabled"
                                placeholder="Contact"
                                value={user.contact || ""}
                                disabled
                              />
                            </div>
                          </div>

                          {/* City */}
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-geo-alt mr-2"></i>
                                City
                              </label>
                              <input
                                type="text"
                                name="city"
                                className="form-control form-control-custom"
                                placeholder="City"
                                value={user.city || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Country */}
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-globe mr-2"></i>
                                Country
                              </label>
                              <input
                                type="text"
                                name="country"
                                className="form-control form-control-custom"
                                placeholder="Country"
                                value={user.country || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Skill to Learn */}
                          <div className="col-12">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-book mr-2"></i>
                                Skills You Want to Learn
                              </label>
                              <input
                                type="text"
                                name="skillToLearn"
                                className="form-control form-control-custom"
                                placeholder="Skill You Want to Learn"
                                value={user.skillToLearn || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Skill to Teach */}
                          <div className="col-12">
                            <div className="form-group">
                              <label className="form-label-custom">
                                <i className="bi bi-lightbulb mr-2"></i>
                                Skills You Can Teach
                              </label>
                              <input
                                type="text"
                                name="skillToTeach"
                                className="form-control form-control-custom"
                                placeholder="Skill You Can Teach"
                                value={user.skillToTeach || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="col-12">
                            <div className="text-center mt-4">
                              <button 
                                type="submit" 
                                className="btn btn-success btn-save-changes"
                                onClick={handleSubmit}
                              >
                                <i className="bi bi-check2-circle mr-2"></i>
                                Save Changes
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* View Mode - Profile Information Cards */
                  <div className="profile-view-section">
                    <div className="row">
                      
                      {/* Email Card */}
                      {user.email && (
                        <div className="col-12 col-md-6 mb-4">
                          <div className="info-card info-card-email">
                            <div className="info-card-body">
                              <div className="d-flex align-items-center">
                                <div className="info-icon-wrapper info-icon-email">
                                  <i className="bi bi-envelope-fill"></i>
                                </div>
                                <div className="info-content">
                                  <h6 className="info-label">Email</h6>
                                  <p className="info-value">{user.email}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Contact Card */}
                      {user.contact && (
                        <div className="col-12 col-md-6 mb-4">
                          <div className="info-card info-card-contact">
                            <div className="info-card-body">
                              <div className="d-flex align-items-center">
                                <div className="info-icon-wrapper info-icon-contact">
                                  <i className="bi bi-telephone-fill"></i>
                                </div>
                                <div className="info-content">
                                  <h6 className="info-label">Contact</h6>
                                  <p className="info-value">{user.contact}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Location Card */}
                      {(user.city || user.country) && (
                        <div className="col-12 col-md-6 mb-4">
                          <div className="info-card info-card-location">
                            <div className="info-card-body">
                              <div className="d-flex align-items-center">
                                <div className="info-icon-wrapper info-icon-location">
                                  <i className="bi bi-geo-alt-fill"></i>
                                </div>
                                <div className="info-content">
                                  <h6 className="info-label">Location</h6>
                                  <p className="info-value">
                                    {user.city}{user.city && user.country ? ', ' : ''}{user.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Skills to Learn */}
                      {user.skillToLearn && (
                        <div className="col-12 mb-4">
                          <div className="info-card info-card-learn">
                            <div className="info-card-body">
                              <div className="d-flex align-items-start">
                                <div className="info-icon-wrapper info-icon-learn">
                                  <i className="bi bi-book-fill"></i>
                                </div>
                                <div className="info-content">
                                  <h6 className="info-label">Skills I Want to Learn</h6>
                                  <p className="info-value">{user.skillToLearn}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Skills to Teach */}
                      {user.skillToTeach && (
                        <div className="col-12 mb-4">
                          <div className="info-card info-card-teach">
                            <div className="info-card-body">
                              <div className="d-flex align-items-start">
                                <div className="info-icon-wrapper info-icon-teach">
                                  <i className="bi bi-lightbulb-fill"></i>
                                </div>
                                <div className="info-content">
                                  <h6 className="info-label">Skills I Can Teach</h6>
                                  <p className="info-value">{user.skillToTeach}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;