import io from "socket.io-client";
<<<<<<< HEAD
import CLIENT_ENDPOINT from "../constants/index";

export const socket = io.connect(CLIENT_ENDPOINT, { cors: { origin: "*" } });
=======
import SERVER_URL from "../constants/index";

export const socket = io.connect(SERVER_URL, { cors: { origin: "*" } });
>>>>>>> 6bf66baf9b8995c3e6d99ac6a98619e1b02f7fa9

export function emitJoinTeam(roomName) {
  socket.emit("join", roomName);
}
