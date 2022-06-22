import React, { useState } from "react";
import "./Form.css";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<Props> = ({ setForm }) => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  function changeFormName(name: string) {
    setName(name);
  }

  function changeLocation(location: string) {
    setLocation(location);
  }

  return (
    <div className="centered">
      <form className="create-form">
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="What is your name?"
            maxLength={60}
            onChange={(event) => {
              changeFormName(event.target.value);
            }}
          />
        </label>
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            placeholder="Select a loction"
            maxLength={200}
            onChange={(event) => {
              changeLocation(event.target.value);
            }}
          />
        </label>
        <label htmlFor="photos">
          Upload
          <br />
          <input
            type="file"
            accept="image/*"
            name="photos"
            className="review-button"
          />
        </label>
        <br />
        <button className="submit-btn">Submit</button>
      </form>
      <button className="go-back-btn" onClick={() => setForm(false)}>
        Go Back
      </button>
    </div>
  );
};

export default Form;
