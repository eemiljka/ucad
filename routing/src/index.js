import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mediaRouter from "./routes/media-router.mjs";
import userRouter from "./routes/user-router.mjs";
import { logger } from "./middlewares/middlewares.mjs";

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); // Corrected path

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "docs")));
// Serve uploaded media files at the URL: /media/{file}
app.use("/media", express.static(path.join(__dirname, "uploads")));

// Simple custom middleware for logging/debugging all requests
app.use(logger);

// Render pug file (home.pug) example
app.get("/", (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render("home", values);
});

// Media endpoints
app.use("/api/media", mediaRouter);

// User endpoints
app.use("/api/users", userRouter);

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}/`);
});
