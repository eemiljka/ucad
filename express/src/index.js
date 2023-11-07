import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getUsers, getUserById, createUser } from "./user.js";
import { getMedia } from "./media.js";
import { getItemsById } from "./media.js";
import { createMediaItem } from "./media.js";
import { deleteMediaItem } from "./media.js";
import { modifyMediaItem } from "./media.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

// simple custom middleware for logging/debugging all requests
app.use((req, res, next) => {
  console.log("Time:", Date.now(), req.method, req.url);
  next();
});

// render pug a file (home.pug) example
app.get("/", (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render("home", values);
});

// dummy routing example
app.get("/kukkuu", (request, response) => {
  const myResponse = { message: "No moro!" };
  //response.json(myResponse);
  response.sendStatus(200);
});

// other dummy pug example
app.get("/:message", (req, res) => {
  const values = { title: "Dummy REST API docs", message: req.params.message };
  res.render("home", values);
});

// MEDIA
app.get("/api/media", getMedia);
// get media items by id
app.get("/api/media/:id", getItemsById);
// add new media item
app.post("/api/media", createMediaItem);
// remove existing media item
app.delete("/api/media/:id", deleteMediaItem);
// modify existing media item
app.put("/api/media/:id", modifyMediaItem);

// USER
app.get("/api/user", getUsers);
// get user by id
app.get("/api/user/:id", getUserById);
// add new user
app.post("/api/user", createUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
