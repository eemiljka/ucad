import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getItems, getItemsById } from "./items.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/docs", express.static(path.join(__dirname, "docs")));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

// routing example
app.get("/kukkuu", (request, response) => {
  const myResponse = { message: "No moro!" };
  response.json(myResponse);
});

//example generic items api
app.get("/api/items", getItems);
app.get("/api/items/:id", getItemsById);
app.put("/api/items");
app.post("/api/items");
app.delete("/api/items");

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
