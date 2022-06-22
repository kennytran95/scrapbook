import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<Props> = ({ setForm }) => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [memPhotos, setMemPhotos] = useState<string[]>([]);

  function changeFormName(name: string) {
    setName(name);
  }

  function changeLocation(location: string) {
    setLocation(location);
  }

  function uploadImages(event: any): void {
    const bodyFormData = new FormData();
    bodyFormData.append("file", event.target.files[0]);
    bodyFormData.append("upload_preset", "nvtzqoul");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/dppbuevux/image/upload",
        bodyFormData
      )
      .then((response) => {
        setMemPhotos([...memPhotos, response.data.url]);
      })
      .catch((err) => console.error(err));
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
            onChange={uploadImages}
          />
        </label>
        <br />
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      <button className="go-back-btn" onClick={() => setForm(false)}>
        Go Back
      </button>
    </div>
  );
};

export default Form;
