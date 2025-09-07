export const BASE_URL = "http://localhost:3000"
export default {
    // user apis
    API_URL:BASE_URL,
    SIGN_UP : BASE_URL + "/user",
    LOGIN : BASE_URL + "/user/login",
    ForgetPassword: BASE_URL + "/user/forgetPassword",
    USER_PROFILE: BASE_URL + "/user/profile",
    LOGOUT: BASE_URL+"/user/logout",
    GETALLUSER: BASE_URL + "/user/getAllUser",

    //contact apis
    ContactUs: BASE_URL + "/contact/sendquery",
}