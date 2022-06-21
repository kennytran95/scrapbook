import { useState } from "react";
import Form from "./Form";
import "./Home.css";

function Home() {
  const [form, setForm] = useState(false);
  const [memory, setMemories] = useState(false);

  function toggleForm() {
    setForm(!form);
  }
  function toggleMemories() {
    setMemories(!memory);
  }

  return (
    <>
      {!form && !memory ? (
        <div className="centered">
          <button onClick={() => toggleForm()} className="create-btn">
            CREATE A NEW MEMORY
          </button>
          <button onClick={() => toggleMemories()} className="create-btn">
            SHOW PAST MEMORIES
          </button>
        </div>
      ) : (
        <div className="centered">
          <Form />
          <button
            className="create-btn"
            onClick={() => {
              setForm(false);
              setMemories(false);
            }}
          >
            GO BACK
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
