import io from "socket.io-client";
import CLIENT_ENDPOINT from "../constants";

const socket = io.connect(CLIENT_ENDPOINT, { cors: { origin: "*" } });
export default socket;
