export const BASE_URL = "https://skillhub-mern-project-backend.onrender.com"
export default {
    // user apis
    API_URL: BASE_URL,
    SIGN_UP: BASE_URL + "/user",
    LOGIN: BASE_URL + "/user/login",
    ForgetPassword: BASE_URL + "/user/forgetPassword",
    USER_PROFILE: BASE_URL + "/user/profile",
    LOGOUT: BASE_URL + "/user/logout",
    GETALLUSER: BASE_URL + "/user/getAllUser",

    // contact apis
    ContactUs: BASE_URL + "/contact/sendquery",

    // post apis
    CREATE_POST: BASE_URL + "/post/createpost",
     GET_ALL_POSTS: BASE_URL + "/post",
    GET_POST_BY_ID: BASE_URL + "/post",
    GET_USER_POSTS:  BASE_URL + "/post/user",
    GET_MY_POSTS: BASE_URL + "/post/my/posts", // This needs backend route fix
    UPDATE_POST: BASE_URL + "/post/update",
    DELETE_POST: BASE_URL + "/post/delete",
    // TOGGLE_LIKE: (id) => BASE_URL + `/post/${id}/like`,
    // ADD_COMMENT: (id) => BASE_URL + `/post/${id}/comment`
}


//BACKEND_URL :-  https://skillhub-mern-project-backend.onrender.com

//FRONTEND_URL :- https://skillhub-mern-project-frontend.onrender.com