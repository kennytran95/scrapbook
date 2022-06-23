const express = require("express");
const db = require("./database/db.js");
const axios = require("axios");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const querystring = require("querystring");
require("dotenv").config();

const PORT = 2121;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const app = express();
app.use(express.static(path.join(__dirname, "../build")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//spotify api

let token;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";
//scope allows access to account info and email while cookie allows us to preserve user session

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

/*
  - '/login' to login on spotify and request authorization.
  - Redirects to '/callback' to use auth code to request access token.
  - Use access token to request data from spotify api
  - Use refresh token to request another access token from spotify to prevent expiration.
*/

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:2222/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => res.send(error));
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => res.send(error));
});

//api routes

app.post("/scrapbook", (req, res) => {
  const { name, date, location, photos, song } = req.body;
  const scrapbookResult = {
    name,
    date,
    location,
    photos,
    song,
  };
  db.addMemory(scrapbookResult)
    .then(() => res.status(200).send("Successfully added to database"))
    .catch((err) => console.error(err));
});

app.get("/scrapbook", (req, res) => {
  db.getAllMemories()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, () => {
  console.log(`Scrapbook server is up and running on port: ${PORT}`);
});
