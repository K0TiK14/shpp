const express = require("express");
const app = express();
const port = 3000;
var counter = 0;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/sum", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const sum = a + b;

  res.send(`Result: ${sum}`);
});

app.get("/counter", (req, res) => {
  counter++;
  res.send(`Counter: ${counter}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}\nhttp://localhost:3000`);
});
