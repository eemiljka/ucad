// index.js
import http from "http";
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("request ", req.method, req.url);
  // TODO: check method, url and generte response accordingly
  // use e.g. if-else
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Welcome to my REST API!");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
