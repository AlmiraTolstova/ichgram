import { io } from "socket.io-client";
import { BASE_URL } from "../api/api";

export const socket = io(BASE_URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});
