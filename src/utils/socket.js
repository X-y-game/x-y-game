import io from "socket.io-client";
import SERVER_URL from "../constants/index";

export const socket = io.connect(SERVER_URL, { cors: { origin: "*" } });

export function emitJoinTeam(roomName) {
  socket.emit("join", roomName);
}
