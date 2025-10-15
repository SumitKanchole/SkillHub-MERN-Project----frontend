import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Search, 
  Filter, 
  Plus, 
  Calendar,
  User,
  Tag,
  Edit3,
  Trash2,
  MoreVertical,
  Menu,
  X,
  TrendingUp,
  Clock,
  Users,
  Hash
} from 'lucide-react';
import Header from '../Header/header';
import endpoints from '../../Apis/EndPoint';
import "./PostPage.css"
import axios from 'axios';
import { getCurrentUser, isUserExist } from '../Auth/Auth';
import { toast } from 'react-toastify';
import Footer from '../footer/footer';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState({});
  const [viewMode, setViewMode] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'relevant'

  const categories = [
    'all', 'Advice', 'Knowledge', 'Experience', 'Tips', 'Tutorial', 'Discussion', 'Other'
  ];

  // Get current user on component mount
  useEffect(() => {
    if (isUserExist()) {
      const user = getCurrentUser();
      setCurrentUser(user);
    }
  }, []);

  // Fetch posts from API
  useEffect(() => {
    fetchPosts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown({});
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(endpoints.GET_ALL_POSTS, { withCredentials: true });
      
      // Handle different possible response structures
      let postsArray = [];
      if (Array.isArray(response.data)) {
        postsArray = response.data;
      } else if (response.data.posts && Array.isArray(response.data.posts)) {
        postsArray = response.data.posts;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        postsArray = response.data.data;
      }
      
      setPosts(postsArray);
    } catch (error) {
      console.error('Error fetching posts:', error);
      if (error.response) {
        setError(`Failed to load posts: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Failed to load posts. Please try again.');
      }
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      if (!isUserExist()) {
        toast.error('Please login to create posts');
        return;
      }

      const response = await axios.post(`${endpoints.CREATE_POST}/${currentUser._id}`, postData, {withCredentials: true});
      const newPost = response.data;
      
      if (newPost) {
        toast.success("Post created successfully!");
        setPosts(prevPosts => [newPost.post || newPost, ...prevPosts]);
        setShowCreateForm(false);
      }
    } catch (error) {
      toast.error('Error creating post');
    }
  };

  const handleUpdatePost = async (postData) => {
    try {
      if (!selectedPost) return;

      const response = await axios.put(`${endpoints.UPDATE_POST}/${currentUser._id}`, postData, {withCredentials: true});
      
      if (response.data.success) {
        toast.success("Post updated successfully!");
        
        // Update the post in the list
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === selectedPost._id 
              ? { ...post, ...postData, updatedAt: new Date().toISOString() }
              : post
          )
        );
        
        setShowUpdateForm(false);
        setSelectedPost(null);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response?.status === 401) {
        toast.error('You are not authorized to update this post');
      } else if (error.response?.status === 404) {
        toast.error('Post not found');
      } else {
        toast.error('Error updating post');
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undo.')) {
      return;
    }

    try {
      const response = await axios.delete(`${endpoints.DELETE_POST}/${currentUser._id}`, {
        withCredentials: true});
      
      if (response.data.success) {
        toast.success("Post deleted successfully!");
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      if (error.response?.status === 401) {
        toast.error('You are not authorized to delete this post');
      } else if (error.response?.status === 404) {
        toast.error('Post not found');
      } else {
        toast.error('Error deleting post');
      }
    }
  };

  const toggleDropdown = (postId, e) => {
    e.stopPropagation();
    setShowDropdown(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const openUpdateModal = (post) => {
    setSelectedPost(post);
    setShowUpdateForm(true);
    setShowDropdown({});
  };

  const canUserModifyPost = (post) => {
    return currentUser && post.author && (currentUser._id === post.author._id || currentUser.id === post.author._id);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate search relevance score
  const calculateRelevanceScore = (post, searchTerm) => {
    if (!searchTerm.trim()) return 0;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    let score = 0;
    
    // Topic matches (highest priority)
    if (post.topic?.toLowerCase().includes(lowerSearchTerm)) {
      score += 100;
      if (post.topic?.toLowerCase() === lowerSearchTerm) {
        score += 50;
      }
      if (post.topic?.toLowerCase().startsWith(lowerSearchTerm)) {
        score += 25;
      }
    }
    
    // Description matches (medium priority)
    if (post.description?.toLowerCase().includes(lowerSearchTerm)) {
      score += 50;
      const occurrences = (post.description?.toLowerCase().match(new RegExp(lowerSearchTerm, 'g')) || []).length;
      score += (occurrences - 1) * 10;
    }
    
    // Tags matches (medium priority)
    if (post.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) {
      score += 40;
      if (post.tags?.some(tag => tag.toLowerCase() === lowerSearchTerm)) {
        score += 20;
      }
    }
    
    // Category matches (lower priority)
    if (post.category?.toLowerCase().includes(lowerSearchTerm)) {
      score += 30;
    }
    
    // Author name matches (lower priority)
    if (post.author?.name?.toLowerCase().includes(lowerSearchTerm)) {
      score += 20;
    }
    
    return score;
  };

  // Enhanced filter and sort function
  const getFilteredAndSortedPosts = () => {
    let filteredPosts = posts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      // Filter by view mode
      let matchesViewMode = true;
      if (viewMode === 'my' && currentUser) {
        matchesViewMode = post.author && (currentUser._id === post.author._id || currentUser.id === post.author._id);
      } else if (viewMode === 'others' && currentUser) {
        matchesViewMode = !post.author || (currentUser._id !== post.author._id && currentUser.id !== post.author._id);
      }
      
      return matchesCategory && matchesViewMode;
    });

    // Apply search filter
    if (searchTerm.trim()) {
      const searchResults = filteredPosts.map(post => ({
        ...post,
        relevanceScore: calculateRelevanceScore(post, searchTerm)
      })).filter(post => post.relevanceScore > 0);

      filteredPosts = searchResults;
    }

    // Apply sorting
    return filteredPosts.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'relevant' && searchTerm.trim()) {
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const filteredPosts = getFilteredAndSortedPosts();

  // Separate posts for stats
  const myPosts = currentUser ? posts.filter(post => 
    post.author && (currentUser._id === post.author._id || currentUser.id === post.author._id)
  ) : [];
  
  const otherPosts = currentUser ? posts.filter(post => 
    !post.author || (currentUser._id !== post.author._id && currentUser.id !== post.author._id)
  ) : posts;

  // Get trending tags (most used tags)
  const getTrendingTags = () => {
    const tagCounts = {};
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count }));
  };

  const trendingTags = getTrendingTags();

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setViewMode('all');
    setSortBy('newest');
  };

  if (loading) {
    return (
      <>
        <Header/>
        <div className="min-vh-100 bg-light p-3" style={{ paddingTop: '80px' }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="card p-4 mt-2">
                      <div className="bg-secondary rounded mb-3 mt-5" style={{ height: '20px', width: '75%', opacity: 0.3 }}></div>
                      <div className="bg-secondary rounded mb-2" style={{ height: '15px', width: '100%', opacity: 0.3 }}></div>
                      <div className="bg-secondary rounded" style={{ height: '15px', width: '66%', opacity: 0.3 }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header/>
        <div className="min-vh-100 p-3" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)', paddingTop: '80px' }}>
          <div className="container-fluid">
            <div className="alert alert-danger d-flex justify-content-between align-items-center">
              <span>{error}</span>
              <button onClick={fetchPosts} className="btn btn-outline-danger btn-sm">
                Retry
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header/>
      <div className="d-flex" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #dfffe0 0%, #e6ffe7 50%, #ffffff 100%)', paddingTop: '25px' }}>
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="position-fixed d-lg-none"
            style={{
              top: '70px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1040
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          className={` position-lg-relative bg-white shadow-sm d-flex flex-column ${sidebarOpen ? 'd-block' : 'd-none d-lg-flex'}`}
          style={{ 
              width: '890px',
              minWidth:"289px",
              margin: '18px',
            height: 'calc(100vh - 177px)',
            top: '70px',
            left: 0,
            zIndex: 1050,
            borderRight: '1px solid #e2e8f0',
            background:'linear-gradient(310deg, #185d072e, #41a9351f)',
            overflowY: 'auto'
          }}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-bottom m-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 font-weight-bold text-dark d-flex align-items-center">
                <Filter className="mr-2" size={20} />
                Filters & Search
              </h5>
              <button
                className="btn btn-link p-0 d-lg-none"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-grow-1 overflow-auto">
            
            {/* Search Section */}
            <div className="p-4 border-bottom">
              <label className="font-weight-bold text-dark mb-2 d-block">
                <Search size={16} className="mr-2" />
                Search Posts
              </label>
              <div className="position-relative">
                <input
                  type="text"
                  placeholder="Search by topic, content, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ paddingRight: '30px' }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="position-absolute btn btn-link p-0 text-muted"
                    style={{ right: '8px', top: '8px', fontSize: '1.2rem' }}
                  >
                    ×
                  </button>
                )}
              </div>
              {searchTerm && (
                <small className="text-muted mt-1 d-block">
                  {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found
                </small>
              )}
            </div>

            {/* View Mode Section */}
            <div className="p-4 border-bottom">
              <label className="font-weight-bold text-dark mb-3 d-block">
                <Users size={16} className="mr-2" />
                View Posts
              </label>
              <div className="d-grid gap-2">
                <button
                  className={`btn text-left ${viewMode === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('all')}
                >
                  <MessageCircle size={16} className="mr-2" />
                  All Posts ({posts.length})
                </button>
                {currentUser && (
                  <button
                    className={`btn text-left ${viewMode === 'my' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setViewMode('my')}
                  >
                    <User size={16} className="mr-2" />
                    My Posts ({myPosts.length})
                  </button>
                )}
                {currentUser && (
                  <button
                    className={`btn text-left ${viewMode === 'others' ? 'btn-info' : 'btn-outline-info'}`}
                    onClick={() => setViewMode('others')}
                  >
                    <Users size={16} className="mr-2" />
                    Community ({otherPosts.length})
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="p-4 border-bottom">
              <label className="font-weight-bold text-dark mb-3 d-block">
                <Tag size={16} className="mr-2" />
                Categories
              </label>
              <div className="d-grid gap-1">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`btn btn-sm text-left ${selectedCategory === category ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="p-4 border-bottom">
              <label className="font-weight-bold text-dark mb-3 d-block">
                <TrendingUp size={16} className="mr-2" />
                Sort By
              </label>
              <div className="d-grid gap-1">
                <button
                  className={`btn btn-sm text-left ${sortBy === 'newest' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setSortBy('newest')}
                >
                  <Clock size={16} className="mr-2" />
                  Newest First
                </button>
                <button
                  className={`btn btn-sm text-left ${sortBy === 'oldest' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setSortBy('oldest')}
                >
                  <Clock size={16} className="mr-2" />
                  Oldest First
                </button>
                {searchTerm && (
                  <button
                    className={`btn btn-sm text-left ${sortBy === 'relevant' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setSortBy('relevant')}
                  >
                    <TrendingUp size={16} className="mr-2" />
                    Most Relevant
                  </button>
                )}
              </div>
            </div>

            {/* Trending Tags */}
            {trendingTags.length > 0 && (
              <div className="p-4 border-bottom">
                <label className="font-weight-bold text-dark mb-3 d-block">
                  <Hash size={16} className="mr-2" />
                  Trending Tags
                </label>
                <div className="d-flex flex-wrap gap-1">
                  {trendingTags.map(({ tag, count }) => (
                    <button
                      key={tag}
                      className="btn btn-sm btn-outline-info"
                      onClick={() => setSearchTerm(tag)}
                      title={`${count} posts`}
                    >
                      #{tag} ({count})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'all' || viewMode !== 'all' || sortBy !== 'newest') && (
              <div className="p-4">
                <button
                  onClick={clearAllFilters}
                  className="btn btn-outline-danger w-100"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1" style={{ marginLeft: sidebarOpen && window.innerWidth < 992 ? '0' : '0' }}>
          
          {/* Mobile Header */}
          <div className="d-lg-none bg-white shadow-sm border-bottom p-3  mr-3" style={{ top: '70px', zIndex: 1000,background:'linear-gradient(135deg, #66BB6A 0%, #4CAF50 30%, #43A047 70%, #2E7D32 100%)' }}>
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="btn btn-outline-secondary"
              >
                <Menu size={20} />
              </button>
              <h5 className="mb-0 font-weight-bold">Community Hub</h5>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn text-white" style={{background:'linear-gradient(112deg, rgb(18 89 0 / 85%), rgb(26 147 13 / 93%))'}}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="d-none d-lg-block bg-white shadow-sm border-bottom p-4" style={{background: 'linear-gradient(135deg, rgb(197 235 199) 0%, rgb(132 209 135) 30%, rgb(119 203 123) 70%, rgb(157 241 161) 100%)',
    borderRadius: "12px"}}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 font-weight-bold text-dark mb-2">Community Hub</h1>
                <p className="text-muted mb-0">
                  Share knowledge, experiences, and connect with others
                  {currentUser && (
                    <span className="d-block small mt-1">
                      Welcome back, <strong>{currentUser.name || currentUser.username}</strong>!
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-success d-flex align-items-center shadow" style={{background:'linear-gradient(112deg, rgb(18 89 0 / 85%), rgb(26 147 13 / 93%))'}}
              >
                <Plus size={20} className="mr-2" />
                Share Your Thoughts
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4">
            
            {/* Results Summary */}
            {(searchTerm || selectedCategory !== 'all' || viewMode !== 'all') && (
              <div className="alert alert-info mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{filteredPosts.length}</strong> post{filteredPosts.length !== 1 ? 's' : ''} found
                    {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
                    {selectedCategory !== 'all' && <span> in <strong>{selectedCategory}</strong></span>}
                    {viewMode !== 'all' && <span> from <strong>{viewMode === 'my' ? 'your posts' : 'community'}</strong></span>}
                  </div>
                  {sortBy === 'relevant' && searchTerm && (
                    <small className="text-muted">Sorted by relevance</small>
                  )}
                </div>
              </div>
            )}

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
              <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                  <MessageCircle size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No posts found</h5>
                  <p className="text-muted">
                    {searchTerm || selectedCategory !== 'all' || viewMode !== 'all'
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'Be the first to share your thoughts!'}
                  </p>
                  {(searchTerm || selectedCategory !== 'all' || viewMode !== 'all') && (
                    <button
                      onClick={clearAllFilters}
                      className="btn btn-outline-primary mt-2"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filteredPosts.map((post, index) => (
                <div key={post._id} className="card shadow-sm mb-4">
                  {/* Search Rank Indicator */}
                  {searchTerm && post.relevanceScore && (
                    <div className="card-header py-2" style={{ backgroundColor: '#e3f2fd' }}>
                      <small className="text-primary">
                        <strong>#{index + 1}</strong> search result
                        {post.relevanceScore > 150 && <span className="ml-2 badge badge-success">Highly Relevant</span>}
                        {post.relevanceScore > 100 && post.relevanceScore <= 150 && <span className="ml-2 badge badge-info">Very Relevant</span>}
                        {post.relevanceScore <= 100 && <span className="ml-2 badge badge-secondary">Relevant</span>}
                      </small>
                    </div>
                  )}
                  
                  {/* Post Header */}
                  <div className="card-body border-bottom">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mr-3" 
                             style={{ width: '40px', height: '40px', backgroundColor: '#dcfce7' }}>
                          {post.author?.profileImage ? (
                            <img src={post.author.profileImage} alt={post.author.name} className="rounded-circle" style={{ width: '40px', height: '40px' }} />
                          ) : (
                            <User size={20} style={{ color: '#16a34a' }} />
                          )}
                        </div>
                        <div>
                          <h6 className="mb-0 font-weight-bold text-dark">{post.author?.name || 'Anonymous'}</h6>
                          <small className="text-muted">{post.author?.bio || 'SkillHub Member'}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center text-muted small mr-3">
                          <Calendar size={16} className="mr-1" />
                          {formatDate(post.createdAt)}
                          {post.updatedAt !== post.createdAt && (
                            <span className="ml-2 text-info small">
                              (edited {formatDate(post.updatedAt)})
                            </span>
                          )}
                        </div>
                        
                        {/* Action Menu for Post Owner */}
                        {canUserModifyPost(post) && (
                          <div className="position-relative">
                            <button
                              className="btn btn-link p-1 text-muted"
                              onClick={(e) => toggleDropdown(post._id, e)}
                              style={{ border: 'none', background: 'none' }}
                            >
                              <MoreVertical size={20} />
                            </button>
                            
                            {showDropdown[post._id] && (
                              <div 
                                className="position-absolute bg-white border rounded shadow-sm"
                                style={{ 
                                  right: 0, 
                                  top: '100%', 
                                  minWidth: '150px',
                                  zIndex: 1000
                                }}
                              >
                                <button
                                  className="btn btn-link w-100 text-left px-3 py-2 d-flex align-items-center"
                                  onClick={() => openUpdateModal(post)}
                                  style={{ border: 'none', borderRadius: 0 }}
                                >
                                  <Edit3 size={16} className="mr-2" />
                                  Edit
                                </button>
                                <button
                                  className="btn btn-link w-100 text-left px-3 py-2 d-flex align-items-center text-danger"
                                  onClick={() => handleDeletePost(post._id)}
                                  style={{ border: 'none', borderRadius: 0 }}
                                >
                                  <Trash2 size={16} className="mr-2" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className={`badge badge-pill px-3 py-1 ${getCategoryClass(post.category)}`}>
                        {post.category}
                      </span>
                    </div>

                    <h4 className="font-weight-bold text-dark mb-3">{post.topic}</h4>
                    <p className="text-muted">{post.description}</p>
                  </div>

                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div className="card-body py-2">
                      <div className="d-flex align-items-center flex-wrap">
                        <Tag size={16} className="text-muted mr-2" />
                        {post.tags.map((tag, index) => (
                          <button
                            key={`${tag}-${index}`}
                            className="badge badge-light mr-2 mb-1 btn p-1"
                            style={{ 
                              backgroundColor: '#f0fdf4', 
                              color: '#166534',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            onClick={() => setSearchTerm(tag)}
                            title={`Search for posts with #${tag}`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateForm && (
        <CreatePostModal 
          onClose={() => setShowCreateForm(false)}
          onPostCreated={handleCreatePost}
          currentUser={currentUser}
        />
      )}

      {/* Update Post Modal */}
      {showUpdateForm && selectedPost && (
        <UpdatePostModal 
          post={selectedPost}
          onClose={() => {
            setShowUpdateForm(false);
            setSelectedPost(null);
          }}
          onPostUpdated={handleUpdatePost}
          currentUser={currentUser}
        />
      )}

      <Footer/>
    </>
  );
}

// Helper function for category styling
const getCategoryClass = (category) => {
  const styles = {
    'Advice': 'text-primary',
    'Knowledge': 'text-info',
    'Experience': 'text-warning',
    'Tips': 'text-warning',
    'Tutorial': 'text-info',
    'Discussion': 'text-danger'
  };
  return styles[category] || 'text-secondary';
};

const getCategoryBackground = (category) => {
  const backgrounds = {
    'Advice': '#e3f2fd',
    'Knowledge': '#f3e5f5',
    'Experience': '#fff3e0',
    'Tips': '#fffde7',
    'Tutorial': '#e8f5e8',
    'Discussion': '#fce4ec'
  };
  return backgrounds[category] || '#f5f5f5';
};

function CreatePostModal({ onClose, onPostCreated, currentUser }) {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    category: 'Other',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.topic.trim() || !formData.description.trim()) {
      toast.error('Please fill in both topic and description');
      return;
    }
    
    setIsSubmitting(true);
    
    const postData = {
      topic: formData.topic.trim(),
      description: formData.description.trim(),
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    try {
      await onPostCreated(postData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['Advice', 'Knowledge', 'Experience', 'Tips', 'Tutorial', 'Discussion', 'Other'];

  return (
    <div className="position-fixed" style={{ 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      zIndex: 1060,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="bg-white rounded shadow-lg" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="border-bottom p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0 font-weight-bold text-dark d-flex align-items-center">
                <Plus size={20} className="mr-2 text-success" />
                Share Your Thoughts
              </h4>
              {currentUser && (
                <small className="text-muted mt-1 d-block">
                  Posting as <strong>{currentUser.name || currentUser.username}</strong>
                </small>
              )}
            </div>
            <button
              onClick={onClose}
              className="btn btn-link p-0 text-muted"
              style={{ fontSize: '1.5rem', textDecoration: 'none' }}
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <MessageCircle size={16} className="mr-2" />
              Topic
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              className="form-control form-control-lg"
              placeholder="What's your topic?"
              maxLength={200}
              disabled={isSubmitting}
            />
            <small className="text-muted">{formData.topic.length}/200 characters</small>
          </div>
          
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <Tag size={16} className="mr-2" />
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="form-control form-control-lg"
              disabled={isSubmitting}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <Edit3 size={16} className="mr-2" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={6}
              className="form-control"
              placeholder="Share your thoughts, experiences, or knowledge..."
              maxLength={2000}
              disabled={isSubmitting}
            />
            <small className="text-muted">{formData.description.length}/2000 characters</small>
          </div>
          
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <Hash size={16} className="mr-2" />
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="form-control"
              placeholder="e.g., React, JavaScript, Career"
              disabled={isSubmitting}
            />
            <small className="text-muted">Add relevant tags to help others find your post</small>
          </div>
          
          <div className="d-flex pt-3 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline-secondary flex-fill"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success flex-fill"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-2" />
                  Share Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdatePostModal({ post, onClose, onPostUpdated, currentUser }) {
  const [formData, setFormData] = useState({
    topic: post.topic || '',
    description: post.description || '',
    category: post.category || 'Other',
    tags: post.tags ? post.tags.join(', ') : ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.topic.trim() || !formData.description.trim()) {
      toast.error('Please fill in both topic and description');
      return;
    }
    
    setIsSubmitting(true);
    
    const postData = {
      topic: formData.topic.trim(),
      description: formData.description.trim(),
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    try {
      await onPostUpdated(postData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['Advice', 'Knowledge', 'Experience', 'Tips', 'Tutorial', 'Discussion', 'Other'];

  return (
    <div className="position-fixed" style={{ 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      zIndex: 1060,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="bg-white rounded shadow-lg" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="border-bottom p-4" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0 font-weight-bold text-dark d-flex align-items-center">
                <Edit3 size={20} className="mr-2 text-warning" />
                Update Your Post
              </h4>
              {currentUser && (
                <small className="text-muted mt-1 d-block">
                  Editing as <strong>{currentUser.name || currentUser.username}</strong>
                </small>
              )}
            </div>
            <button
              onClick={onClose}
              className="btn btn-link p-0 text-muted"
              style={{ fontSize: '1.5rem', textDecoration: 'none' }}
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <MessageCircle size={16} className="mr-2" />
              Topic
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              className="form-control form-control-lg"
              placeholder="What's your topic?"
              maxLength={200}
              disabled={isSubmitting}
            />
            <small className="text-muted">{formData.topic.length}/200 characters</small>
          </div>
          
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <Tag size={16} className="mr-2" />
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="form-control form-control-lg"
              disabled={isSubmitting}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <Edit3 size={16} className="mr-2" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={6}
              className="form-control"
              placeholder="Share your thoughts, experiences, or knowledge..."
              maxLength={2000}
              disabled={isSubmitting}
            />
            <small className="text-muted">{formData.description.length}/2000 characters</small>
          </div>
          
          <div className="form-group">
            <label className="font-weight-bold text-dark mb-2">
              <Hash size={16} className="mr-2" />
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="form-control"
              placeholder="e.g., React, JavaScript, Career"
              disabled={isSubmitting}
            />
            <small className="text-muted">Add relevant tags to help others find your post</small>
          </div>
          
          <div className="d-flex pt-3 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline-secondary flex-fill"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-warning flex-fill text-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit3 size={16} className="mr-2" />
                  Update Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPage;