import { Memory } from "./Memories";
import "./Memory.css";
import Player from "./Player";

interface Props {
  dbMemory: Memory;
}

const DbMemory: React.FC<Props> = ({ dbMemory }) => {
  return (
    <div className="postcard-container">
      <p>{dbMemory.name}</p>

      {dbMemory.photos[0] === undefined ? (
        <img
          src="https://cdn.discordapp.com/attachments/938570207859970061/989088063588282388/IMG_9527_Original.jpg"
          alt="postcard"
          className="postcard-img"
        />
      ) : (
        <img src={dbMemory.photos[0]} alt="postcard" className="postcard-img" />
      )}
      <p>{dbMemory.location}</p>
      <p>{dbMemory.song}</p>
    </div>
  );
};

export default DbMemory;
