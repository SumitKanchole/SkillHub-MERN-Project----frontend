// components/Connection/Connect.js - Updated with search functionality
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EndPoint from "../../Apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Header/header";
import { getCurrentUser } from "../Auth/Auth";
import { FaComments, FaMapMarkerAlt, FaGraduationCap, FaBookOpen, FaUser, FaSearch, FaTimes } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Connect.css"; // Import the separate CSS file

function ConnectPage() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState({});
  
  // Search functionality states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all"); // all, name, location, teach, learn

  // Initialize current user
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast.error("Please login to access this page");
      navigate("/login");
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  // Fetch all users
  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(EndPoint.GETALLUSER, {
          withCredentials: true,
        });
        setAllUsers(response);

        if (response.data?.success) {
          // Filter out current user from the list
          const filteredUsers = response.data.users.filter(
            (user) => user._id !== currentUser._id
          );
          setAllUsers(filteredUsers);
        } else {
          toast.error("Failed to load users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error loading users. Please refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  // Filter users based on search query and filter type
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return allUsers;

    const query = searchQuery.toLowerCase().trim();

    return allUsers.filter((user) => {
      switch (searchFilter) {
        case "name":
          return user.name?.toLowerCase().includes(query);
        
        case "location":
          return (
            user.city?.toLowerCase().includes(query) ||
            user.country?.toLowerCase().includes(query)
          );
        
        case "teach":
          return user.skillToTeach?.toLowerCase().includes(query);
        
        case "learn":
          return user.skillToLearn?.toLowerCase().includes(query);
        
        case "all":
        default:
          return (
            user.name?.toLowerCase().includes(query) ||
            user.city?.toLowerCase().includes(query) ||
            user.country?.toLowerCase().includes(query) ||
            user.skillToTeach?.toLowerCase().includes(query) ||
            user.skillToLearn?.toLowerCase().includes(query) ||
            user.bio?.toLowerCase().includes(query)
          );
      }
    });
  }, [allUsers, searchQuery, searchFilter]);

  // Handle chat button click
  const handleChatClick = async (userId, userName) => {
    if (!userId) {
      toast.error("Invalid user selected");
      return;
    }

    try {
      setChatLoading(prev => ({ ...prev, [userId]: true }));
      
      // For now, navigate to a simple chat page with user info
      // You can later implement actual chat room creation here
      navigate(`/connect/chatPage`, { 
        state: { 
          chatUserId: userId, 
          chatUserName: userName,
          currentUser: currentUser 
        } 
      });
      
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to start chat");
    } finally {
      setChatLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchFilter("all");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="loading-text">Loading users...</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      
      <div className="container-fluid py-4 connect-page-container">
        {/* Header Section */}
        <div className="connect-header justify-content-center text-center">
          <h1 className="connect-title">
            Discover & Connect
          </h1>
          <p className="connect-subtitle">
            Find people to exchange skills with • {filteredUsers.length} of {allUsers.length} users shown
          </p>
        </div>

        {/* Search Section */}
        <div className="container mb-4">
          <div className="search-container">
            <div className="row g-3 align-items-end">
              {/* Search Input */}
              <div className="col-12 col-md-8 col-lg-6">
                <label htmlFor="searchInput" className="form-label search-label">
                  <FaSearch className="me-1" />
                  Search Users
                </label>
                <div className="search-input-group">
                  <input
                    id="searchInput"
                    type="text"
                    className="form-control search-input"
                    placeholder="Search by name, location, skills, or bio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="btn search-clear-btn"
                      onClick={clearSearch}
                      title="Clear search"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Filter */}
              <div className="col-12 col-md-4 col-lg-3">
                <label htmlFor="searchFilter" className="form-label search-label">
                  Filter by
                </label>
                <select
                  id="searchFilter"
                  className="form-select search-filter"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                >
                  <option value="all">All Fields</option>
                  <option value="name">Name</option>
                  <option value="location">Location</option>
                  <option value="teach">Can Teach</option>
                  <option value="learn">Wants to Learn</option>
                </select>
              </div>

              {/* Clear Button */}
              {(searchQuery || searchFilter !== "all") && (
                <div className="col-12 col-md-12 col-lg-3">
                  <button
                    className="btn btn-outline-secondary w-100 clear-filters-btn"
                    onClick={clearSearch}
                  >
                    <FaTimes className="me-1" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="container">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              {searchQuery ? (
                <>
                  <FaSearch size={80} className="empty-state-icon" />
                  <h3 className="empty-state-title">No users found</h3>
                  <p className="empty-state-subtitle">
                    No users match your search criteria "{searchQuery}"
                    {searchFilter !== "all" && ` in ${searchFilter}`}
                  </p>
                  <button
                    className="btn btn-success btn-lg clear-search-btn"
                    onClick={clearSearch}
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <FaUser size={80} className="empty-state-icon" />
                  <h3 className="empty-state-title">No users found</h3>
                  <p className="empty-state-subtitle">Be the first to complete your profile!</p>
                  <button
                    className="btn btn-success btn-lg complete-profile-btn"
                    onClick={() => navigate("/profile")}
                  >
                    Complete Profile
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="row g-4">
              {filteredUsers.map((user) => (
                <div key={user._id} className="col-12 col-sm-10 col-lg-4 col-xl-4">
                  <div className="card user-card">
                    {/* Profile Header */}
                    <div className="card-body user-card-body">
                      {/* Profile Image */}
                      <div className="text-center mb-3">
                        <div className="profile-image-container">
                          <img
                            src={user.profileImage || "/assets/user.jpg"}
                            alt={user.name}
                            className="rounded-circle profile-image"
                            onError={(e) => {
                              e.target.src = "/assets/user.png";
                            }}
                          />
                          <span className="online-indicator"></span>
                        </div>
                      </div>

                      {/* User Name */}
                      <h5 className="card-title user-name">
                        {user.name || "Unknown User"}
                      </h5>

                      {/* Location */}
                      <div className="user-location">
                        <small className="location-text">
                          <FaMapMarkerAlt className="location-icon" />
                          {user.city || "Unknown"}, {user.country || "Unknown"}
                        </small>
                      </div>

                      {/* Bio */}
                      <div className="user-bio">
                        <p className="bio-text">
                          {user.bio || "No bio available"}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="skills-section">
                        {/* Skill to Teach */}
                        <div className="skill-item">
                          <div className="skill-header">
                            <FaGraduationCap className="skill-icon teach" />
                            <small className="skill-label">Can Teach:</small>
                          </div>
                          <span className="badge skill-badge teach">
                            {user.skillToTeach || "Not specified"}
                          </span>
                        </div>

                        {/* Skill to Learn */}
                        <div className="skill-item">
                          <div className="skill-header">
                            <FaBookOpen className="skill-icon learn" />
                            <small className="skill-label">Wants to Learn:</small>
                          </div>
                          <span className="badge skill-badge learn">
                            {user.skillToLearn || "Not specified"}
                          </span>
                        </div>
                      </div>

                      {/* Chat Button */}
                      <div className="chat-button-container">
                        <button
                          className="btn btn-success btn-sm chat-button"
                          onClick={() => handleChatClick(user._id, user.name)}
                          disabled={chatLoading[user._id]}
                        >
                          {chatLoading[user._id] ? (
                            <>
                              <div className="spinner-border spinner-border-sm chat-loading-spinner" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                              Connecting...
                            </>
                          ) : (
                            <>
                              <FaComments className="chat-button-icon" />
                              Start Chat
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <button
          className="btn btn-outline-success refresh-button"
          onClick={() => window.location.reload()}
          title="Refresh"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </>
  );
}

export default ConnectPage;