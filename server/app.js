const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;

const app = express();

// Have Node serve the files for our built React app
parent_dir = path.resolve(__dirname, "..")
app.use(express.static(path.resolve(parent_dir, 'client/build/')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(parent_dir, 'client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
