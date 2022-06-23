import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Memories.css";
import DbMemory from "./Memory";

interface Props {
  setMemories: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Memory {
  _id: string;
  id: number;
  name: string;
  date: Date;
  location: string;
  photos: [string];
  song: string;
  __v: number;
}

const Memories: React.FC<Props> = ({ setMemories }) => {
  const [dbMemories, setDbMemories] = useState<Memory[]>([]);
  const url = "http://localhost:2121/scrapbook";

  useEffect(() => {
    (async () => {
      const result = await axios.get<Memory[]>(url);
      setDbMemories(result.data);
    })();
  }, []);

  return (
    <>
      <div className="memories-container">
        {dbMemories.map((dbMemory) => (
          <DbMemory dbMemory={dbMemory} key={dbMemory._id} />
        ))}
        <button className="back-btn" onClick={() => setMemories(false)}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default Memories;
