import SpotifyPlayer from "react-spotify-web-playback";
import { accessToken } from "./spotify";

export default function Player() {
  if (!accessToken) return null;
  return (
    <div className="spotify-player">
      <SpotifyPlayer
        token={accessToken}
        play={true}
        uris={["spotify:track:3zSCNTXI7Ed0PiidZVmzIe"]}
      />
    </div>
  );
}
