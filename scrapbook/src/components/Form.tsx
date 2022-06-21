import { useState } from "react";
import "./Form.css";

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  function changeFormName(name: string) {
    setName(name);
  }

  function changeLocation(location: string) {
    setLocation(location);
  }

  return (
    <>
      <form>
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
    </>
  );
};

export default Form;
