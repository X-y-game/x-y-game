import React, { useEffect, useState } from "react";
import Channels from "./Channels";
import { getChannels } from "../../utils/api";

export default function ChannelContainer() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getChannels(setChannels);
  }, []);

  return <Channels channels={channels} />;
}
