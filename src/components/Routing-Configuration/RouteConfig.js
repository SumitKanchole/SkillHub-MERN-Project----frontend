import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/about";
import ContactUs from "../Contact/ContactUS";
import Ragister from "../Ragister/Ragister";
import Login from "../LogIn/Login";
import ForgetPassword from "../LogIn/ForgetPassword";
import ConnectPage from "../Connection/Connect";
import ChatPage from "../Connection/Chat";
import ProfilePage from "../Profile/profile";
import PostsPage from "../posts/PostsPage";
import PrivacyPolicy from "../PrivacyPolicies/PrivacyPolicy";

function RouteConfig() {
    return <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='about' element={<About/>} />
            <Route path='contact' element={<ContactUs/>} />
            <Route path='ragister' element={<Ragister/>} />
            <Route path='Login' element={<Login/>} />
            <Route path='forgot-password' element={<ForgetPassword/>} />
            <Route path='connect' element={<ConnectPage/>} />
            <Route path='connect/chatPage' element={<ChatPage />} />
            <Route path='profile' element={<ProfilePage/>}/>
            <Route path='post' element={<PostsPage/>}/>
            <Route path='privacy' element={<PrivacyPolicy/>}/>
        </Routes>
    </>
}
export default RouteConfig;