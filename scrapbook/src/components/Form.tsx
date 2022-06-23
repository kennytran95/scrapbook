import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import "./Form.css";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<Props> = ({ setForm }) => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [song, setSong] = useState<string>("");
  const [memPhotos, setMemPhotos] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  function changeFormName(name: string) {
    setName(name);
  }

  function changeLocation(location: string) {
    setLocation(location);
  }

  function changeSong(song: string) {
    setSong(song);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const formResult = {
      name,
      location,
      song,
      date: Date.now(),
      photos: memPhotos,
    };
    console.log(formResult);
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
      .then((response) => setMemPhotos([...memPhotos, response.data.url]))
      .catch((error) => console.error(error));
  }

  return (
    <div className="centered">
      <form className="create-form" onSubmit={handleSubmit}>
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
        <label htmlFor="song">
          Song
          <input
            type="search"
            name="song"
            placeholder="Search song/artist"
            maxLength={100}
            onChange={(event) => {
              changeSong(event.target.value);
            }}
          />
        </label>
        {!token ? (
          <a className="spotify-link" href="http://localhost:2121/login">
            Log in to Spotify
          </a>
        ) : (
          <>
            {profile && (
              <div>
                <p>
                  <i>Hello {profile.display_name}</i>
                </p>
                {profile.images.length && profile.images[0].url && (
                  <img
                    src={profile.images[0].url}
                    alt="Avatar"
                    className="spotify-avatar"
                  />
                )}
              </div>
            )}
            <button onClick={logout} className="spotify-logout-btn">
              Log out
            </button>
          </>
        )}

        <label htmlFor="photos">
          Upload
          <br />
          <input
            type="file"
            accept="image/*"
            name="photos"
            className="review-button"
            onChange={(event) => uploadImages(event)}
          />
        </label>
        <br />
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      <button
        className="go-back-btn"
        type="submit"
        onClick={() => {
          setForm(false);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Form;
