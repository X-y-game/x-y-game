import io from "socket.io-client";
import CLIENT_ENDPOINT from "../constants";

export const socket = io.connect(CLIENT_ENDPOINT, { cors: { origin: "*" } });

export function emitJoinTeam(roomName) {
  socket.emit("join", roomName);
}
