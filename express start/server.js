const express = require("express");
const app = express();
const port = 3000

app.get('/',(req,res) => {
  res.send("Hello Express")
})

app.get('/contact', (req,res) => {
  res.send('Contact me at hemanth@gmail.com')
})

app.get('/about', (req, res) => {
  res.send('This is hemanth')
})

app.listen(port, function () {
  console.log("got to http://localhost:"+port);
});
