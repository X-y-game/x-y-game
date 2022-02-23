import io from "socket.io-client";
import SERVER_URL from "../constants/index";

export const getSocket = io.connect(SERVER_URL, { cors: { origin: "*" } });

export function emitJoinTeam(roomName) {
  getSocket.emit("join", roomName);
}
