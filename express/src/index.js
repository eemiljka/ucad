import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getUsers } from "./user.js";
import { getMedia } from "./media.js";
import { getItemsById } from "./media.js";

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

// example generic items api

// get all items
app.get("/api/items", getMedia);
// get items by id
app.get("/api/items/:id", getItemsById);
// modify
app.put("/api/items/:id");
// add new item
//app.post("/api/items", postItem);
// remove existing item
app.delete("/api/items/:id");

// media endpoints
app.get("/api/media", getMedia);

/*app.get("/api/media/:id", (req, res) => {
  const mediaId = parseInt(req.params.id);
  const mediaItem = mediaItems.find((item) => item.media_id === mediaId);

  if (mediaItem) {
    res.json(mediaItem);
  } else {
    res.status(404).json({ message: "Media item not found" });
  }
});

app.post("/api/media", (req, res) => {
  const newItem = req.body;
  newItem.media_id = generateNewMediaId();
  mediaItems.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/media/:id", (req, res) => {
  const mediaId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = mediaItems.findIndex((item) => item.media_id === mediaId);
  if (index !== -1) {
    mediaItems[index] = { ...mediaItems[index], ...updatedItem };
    res.json(mediaItems[index]);
  } else {
    res.status(404).json({ message: "Media item not found" });
  }
});

app.delete("/api/media/:id", (req, res) => {
  const mediaId = parseInt(req.params.id);
  const index = mediaItems.findIndex((item) => item.media_id === mediaId);

  if (index !== -1) {
    const deletedItem = mediaItems.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Media item not found" });
  }
});*/

// user endpoints
app.get("/api/user", getUsers);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
