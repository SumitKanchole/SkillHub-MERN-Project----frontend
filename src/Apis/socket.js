
import { io } from "socket.io-client";

const URL = "https://skillhub-mern-project-backend.onrender.com";


export const socket = io(URL, {autoConnect: false });
