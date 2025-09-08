import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../Auth/Auth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; // Add this import
import { 
  FaPaperPlane, 
  FaArrowLeft, 
  FaUser, 
  FaVideo,
  FaVideoSlash, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaPhoneSlash,
  FaExpand,
  FaCompress
} from "react-icons/fa";
import "./ChatPage.css";
import io from "socket.io-client";

function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const socketRef = useRef(null);
  
  const [currentUser, setCurrentUser] = useState(getCurrentUser() || null);
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true); // Add this state
  const [roomId, setRoomId] = useState("");
  
  // Video call states
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [isOutgoingCall, setIsOutgoingCall] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStartTime, setCallStartTime] = useState(null);

  // Fetch chat messages using axios
  const fetchChatMessages = async (roomId) => {
    try {
      setIsLoadingMessages(true);
      console.log(`📚 Fetching messages for room: ${roomId}`);
      
      const response = await axios.get(`https://skillhub-mern-project-backend.onrender.com/room/${roomId}/messages`, {
        withCredentials: true,
        timeout: 10000, // 10 second timeout
      });

      if (response.data.success) {
        const { messages: fetchedMessages } = response.data;
        console.log(`📚 Fetched ${fetchedMessages.length} messages from API`);
        
        if (fetchedMessages && fetchedMessages.length > 0) {
          setMessages(fetchedMessages);
        } else {
          // Add welcome message if no history
          setMessages([{
            _id: "welcome",
            sender: "system",
            message: `You are now connected with ${chatUser?.name || 'user'}. Start the conversation!`,
            timestamp: new Date(),
            isSystem: true
          }]);
        }
      } else {
        console.error("❌ Failed to fetch messages:", response.data.error);
        toast.error("Failed to load chat history");
      }
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
      toast.error("Failed to load chat history");
      
      // Add welcome message on error
      setMessages([{
        _id: "welcome",
        sender: "system",
        message: `You are now connected with ${chatUser?.name || 'user'}. Start the conversation!`,
        timestamp: new Date(),
        isSystem: true
      }]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Initialize Socket Connection
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast.error("Please login to access chat");
      navigate("/login");
      return;
    }
    setCurrentUser(user);

    // Get chat user from location state
    if (location.state?.chatUserId && location.state?.chatUserName) {
      const chatUserData = {
        _id: location.state.chatUserId,
        name: location.state.chatUserName
      };
      setChatUser(chatUserData);
      
      // Create room ID (consistent for both users)
      const generatedRoomId = [user._id, location.state.chatUserId].sort().join("_");
      setRoomId(generatedRoomId);

      // Fetch chat messages using axios
      fetchChatMessages(generatedRoomId);

      // Initialize Socket
      socketRef.current = io("https://skillhub-mern-project-backend.onrender.com", {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        timeout: 20000,
      });

      // Setup socket event listeners BEFORE connecting
      setupSocketListeners();

      // Socket connection event handlers
      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected:", socketRef.current.id);
        toast.success("Connected to chat server");
        
        // Join chat room after connection is established
        socketRef.current.emit("joinRoom", {
          roomId: generatedRoomId,
          userId: user._id
        });
        console.log("Joining room:", generatedRoomId, "User:", user._id);
      });
      
    } else {
      toast.error("Chat user not found");
      navigate("/connect");
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      endCall(); // Clean up any ongoing call
    };
  }, [location, navigate]);

  // Setup Socket Event Listeners (UPDATED - removed chatHistory listener)
  const setupSocketListeners = () => {
    if (!socketRef.current) return;

    // Socket event confirmations
    socketRef.current.on("roomJoined", ({ roomId, userId }) => {
      console.log("✅ Successfully joined room:", roomId);
    });

    socketRef.current.on("messageSent", ({ messageId, success }) => {
      console.log("✅ Message sent confirmation:", messageId);
    });

    socketRef.current.on("messageError", ({ error, details }) => {
      console.error("❌ Message error:", error, details);
      toast.error(`Message failed: ${error}`);
    });

    socketRef.current.on("joinRoomError", ({ error, details }) => {
      console.error("❌ Join room error:", error, details);
      toast.error(`Failed to join chat: ${error}`);
    });

    // Receive new message (REAL TIME)
    socketRef.current.on("receiveMessage", (messageData) => {
      console.log("📨 Received new message:", messageData);
      
      const formattedMessage = {
        _id: messageData._id,
        sender: messageData.sender,
        senderName: messageData.senderName || "Unknown",
        receiver: messageData.receiver,
        message: messageData.message,
        timestamp: messageData.createdAt || messageData.timestamp || new Date()
      };
      
      console.log("📨 Formatted message:", formattedMessage);
      
      setMessages(prev => {
        // Avoid duplicate messages
        const exists = prev.find(msg => msg._id === formattedMessage._id);
        if (exists) {
          console.log("📨 Message already exists, skipping");
          return prev;
        }
        
        const newMessages = [...prev, formattedMessage];
        console.log("📨 Updated messages array:", newMessages);
        return newMessages;
      });
    });

    // Video call signaling events
    socketRef.current.on("incomingVideoCall", ({ from, fromName, offer, roomId: callRoomId }) => {
      setIsIncomingCall(true);
      toast.info(`Incoming video call from ${fromName}`);
      
      // Store the offer for when user accepts
      window.incomingCallData = { from, fromName, offer, callRoomId };
    });

    socketRef.current.on("videoCallAccepted", async ({ answer, from }) => {
      if (peerConnectionRef.current && answer) {
        await peerConnectionRef.current.setRemoteDescription(answer);
        setIsOutgoingCall(false);
        setIsVideoCallActive(true);
        setCallStartTime(Date.now());
        toast.success('Call connected!');
        
        addSystemMessage("Video call started");
      }
    });

    socketRef.current.on("videoCallDeclined", ({ from }) => {
      setIsOutgoingCall(false);
      endCall();
      toast.error('Call declined');
    });

    socketRef.current.on("videoCallEnded", ({ from }) => {
      endCall();
    });

    socketRef.current.on("iceCandidate", async ({ candidate, from }) => {
      if (peerConnectionRef.current && candidate) {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
        } catch (error) {
          console.error('Error adding ICE candidate:', error);
        }
      }
    });
  };

  // Add system message helper
  const addSystemMessage = (message) => {
    const systemMessage = {
      _id: `system-${Date.now()}`,
      sender: "system",
      message,
      timestamp: new Date(),
      isSystem: true
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  // Scroll to bottom when new message arrives
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Call duration timer
  useEffect(() => {
    let interval;
    if (isVideoCallActive && callStartTime) {
      interval = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - callStartTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoCallActive, callStartTime]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize WebRTC peer connection
  const initializePeerConnection = () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };

    peerConnectionRef.current = new RTCPeerConnection(configuration);

    // Handle remote stream
    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Handle ICE candidates
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("iceCandidate", {
          candidate: event.candidate,
          to: chatUser._id,
          roomId: roomId
        });
      }
    };

    return peerConnectionRef.current;
  };

  // Start video call
  const startVideoCall = async () => {
    try {
      setIsOutgoingCall(true);
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize peer connection
      const peerConnection = initializePeerConnection();

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Create offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send offer via socket
      if (socketRef.current) {
        socketRef.current.emit("startVideoCall", {
          to: chatUser._id,
          from: currentUser._id,
          fromName: currentUser.name,
          offer: offer,
          roomId: roomId
        });
      }

      toast.info(`Calling ${chatUser.name}...`);
      
    } catch (error) {
      console.error('Error starting video call:', error);
      toast.error('Failed to start video call. Please check camera permissions.');
      setIsOutgoingCall(false);
    }
  };

  // Accept incoming call
  const acceptCall = async () => {
    try {
      const callData = window.incomingCallData;
      if (!callData) return;

      setIsIncomingCall(false);

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize peer connection
      const peerConnection = initializePeerConnection();

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Set remote description (offer)
      await peerConnection.setRemoteDescription(callData.offer);

      // Create answer
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      // Send answer via socket
      if (socketRef.current) {
        socketRef.current.emit("acceptVideoCall", {
          to: callData.from,
          from: currentUser._id,
          answer: answer,
          roomId: callData.callRoomId
        });
      }

      setIsVideoCallActive(true);
      setCallStartTime(Date.now());
      toast.success('Call connected!');
      
      addSystemMessage("Video call started");
      
      // Clear incoming call data
      delete window.incomingCallData;
      
    } catch (error) {
      console.error('Error accepting call:', error);
      toast.error('Failed to accept call');
    }
  };

  // Decline incoming call
  const declineCall = () => {
    const callData = window.incomingCallData;
    if (callData && socketRef.current) {
      socketRef.current.emit("declineVideoCall", {
        to: callData.from,
        from: currentUser._id,
        roomId: callData.callRoomId
      });
    }

    setIsIncomingCall(false);
    setIsOutgoingCall(false);
    delete window.incomingCallData;
    toast.info('Call declined');
  };

  // End video call
  const endCall = () => {
    // Notify other user
    if (socketRef.current && chatUser) {
      socketRef.current.emit("endVideoCall", {
        to: chatUser._id,
        from: currentUser._id,
        roomId: roomId
      });
    }

    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      localStreamRef.current = null;
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Reset video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    // Reset states
    setIsVideoCallActive(false);
    setIsIncomingCall(false);
    setIsOutgoingCall(false);
    setIsFullScreen(false);
    setCallDuration(0);
    setCallStartTime(null);

    // Add system message about call end
    if (isVideoCallActive) {
      addSystemMessage("Video call ended");
    }

    toast.error('Call ended');
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Format call duration
  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Send message via socket
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !chatUser || !socketRef.current) {
      console.log("Cannot send message:", {
        hasMessage: !!newMessage.trim(),
        hasChatUser: !!chatUser,
        hasSocket: !!socketRef.current,
        socketConnected: socketRef.current?.connected
      });
      return;
    }

    const messageData = {
      sender: currentUser._id,
      senderName: currentUser.name,
      receiver: chatUser._id,
      message: newMessage.trim(),
    };

    try {
      setIsLoading(true);
      
      console.log("Sending message:", messageData);
      
      // Send message via socket
      socketRef.current.emit("sendMessage", messageData);
      
      // Clear input immediately
      setNewMessage("");
      
      toast.success("Message sent!");
      
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentUser || !chatUser) {
    return (
      <div className="chat-loading">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className={`chat-container ${isVideoCallActive ? 'video-call-active' : ''} ${isFullScreen ? 'fullscreen' : ''}`}>
        {/* Chat Header */}
        <div className="chat-header">
          <button
            className="back-button"
            onClick={() => navigate("/connect")}
          >
            <FaArrowLeft />
          </button>
          
          <div className="d-flex align-items-center">
            <div className="user-avatar">
              {chatUser.profileImage || <FaUser />}
            </div>
            <div className="user-info">
              <h6>{chatUser.name}</h6>
              <small className="user-status">
                {isVideoCallActive ? `On call - ${formatCallDuration(callDuration)}` : 'Online'}
              </small>
            </div>
          </div>

          {/* Video Call Controls */}
          <div className="call-controls">
            {!isVideoCallActive && !isOutgoingCall && (
              <button
                className="video-call-button"
                onClick={startVideoCall}
                title="Start video call"
              >
                <FaVideo />
              </button>
            )}
          </div>
        </div>

        {/* Video Call Interface */}
        {(isVideoCallActive || isOutgoingCall || isIncomingCall) && (
          <div className="video-call-overlay">
            <div className="video-container">
              {/* Remote Video */}
              <div className="remote-video-container">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="remote-video"
                />
                <div className="remote-user-info">
                  <span>{chatUser.name}</span>
                </div>
              </div>

              {/* Local Video */}
              <div className="local-video-container">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="local-video"
                />
                <div className="local-user-info">
                  <span>You</span>
                </div>
              </div>

              {/* Call Controls */}
              <div className="video-call-controls">
                <button
                  className={`control-button ${!isAudioEnabled ? 'disabled' : ''}`}
                  onClick={toggleAudio}
                  title={isAudioEnabled ? 'Mute audio' : 'Unmute audio'}
                >
                  {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>

                <button
                  className={`control-button ${!isVideoEnabled ? 'disabled' : ''}`}
                  onClick={toggleVideo}
                  title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                </button>

                <button
                  className="control-button"
                  onClick={toggleFullScreen}
                  title={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullScreen ? <FaCompress /> : <FaExpand />}
                </button>

                <button
                  className="control-button end-call"
                  onClick={endCall}
                  title="End call"
                >
                  <FaPhoneSlash />
                </button>
              </div>

              {/* Call Status */}
              {isOutgoingCall && !isVideoCallActive && (
                <div className="call-status">
                  <div className="calling-animation">
                    <div className="pulse"></div>
                    <FaVideo size={30} />
                  </div>
                  <p>Calling {chatUser.name}...</p>
                  <button className="cancel-call-button" onClick={endCall}>
                    Cancel
                  </button>
                </div>
              )}

              {isIncomingCall && (
                <div className="incoming-call">
                  <div className="caller-info">
                    <div className="caller-avatar">
                      <FaUser size={40} />
                    </div>
                    <h4>{chatUser.name}</h4>
                    <p>Incoming video call...</p>
                  </div>
                  <div className="incoming-call-controls">
                    <button className="accept-call-button" onClick={acceptCall}>
                      <FaVideo />
                      Accept
                    </button>
                    <button className="decline-call-button" onClick={declineCall}>
                      <FaPhoneSlash />
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Area */}
        {!isFullScreen && (
          <div className="messages-container">
            <div className="messages-list">
              {isLoadingMessages ? (
                <div className="loading-messages">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading messages...</span>
                  </div>
                  <p>Loading chat history...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="empty-messages">
                  <FaUser size={50} />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={message._id || index}>
                    {message.isSystem ? (
                      <div className="system-message">
                        <span className="system-badge">
                          {message.message}
                        </span>
                      </div>
                    ) : (
                        <div className={`message-row ${message.sender === currentUser._id ? 'sent' : 'received'}`}>
                          <div className="user-avatar">
                            {chatUser.profileImage || <FaUser />}
                          </div>
                        <div className={`message-bubble ${message.sender === currentUser._id ? 'sent' : 'received'}`}>
                          <p className="message-text">
                            {message.message}
                          </p>
                          <small className="message-time">
                            {formatTime(message.timestamp)}
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Message Input */}
        {!isFullScreen && (
          <div className="message-input-container">
            <form onSubmit={handleSendMessage} className="message-input-form">
              <textarea
                className="message-textarea"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="send-button"
                disabled={!newMessage.trim() || isLoading}
              >
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Sending...</span>
                  </div>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatPage;