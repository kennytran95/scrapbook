import React, { useState } from "react";
import Form from "./Form";
import Memories from "./Memories";
import "./Home.css";

const Home: React.FC = () => {
  const [form, setForm] = useState<boolean>(false);
  const [memory, setMemories] = useState<boolean>(false);

  return (
    <>
      {!form && !memory && (
        <div className="btn-container">
          <button onClick={() => setForm(true)} className="create-btn">
            CREATE A NEW MEMORY
          </button>
          <button onClick={() => setMemories(true)} className="create-btn">
            SHOW PAST MEMORIES
          </button>
        </div>
      )}
      {form && <Form setForm={setForm} />}
      {memory && <Memories setMemories={setMemories} />}
    </>
  );
};

export default Home;
