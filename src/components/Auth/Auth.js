import { Navigate } from "react-router-dom";

export const isUserExist = ()=>{
    return !!sessionStorage.getItem("current-user");
}

export const getCurrentUser = ()=>{
   let user =  sessionStorage.getItem("current-user");
   user = JSON.parse(user);
   return user;
}


export const getAllUsers = () => {
    try {
        const users = sessionStorage.getItem('all-users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error getting all users:', error);
        return [];
    }
};

export const saveAllUsers = (users) => {
    try {
        if (Array.isArray(users) && users.length > 0) {
            sessionStorage.setItem('all-users', JSON.stringify(users));
            console.log(`💾 Saved ${users.length} users to cache`);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving users:', error);
        return false;
    }
};

function Auth({ children }) {
  if (isUserExist()) {
    return children;  
    }
    return <Navigate to="/Login"/>
}
  
export default Auth;