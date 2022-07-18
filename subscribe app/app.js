const express = require("express");
const app = express();

app.use(express.static("public"));

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000;

app.get("/", (req,res) => {
  res.sendFile(__dirname+'/signup.html')
})

app.post("/response", (req, res) => {
  console.log(req.body)
  inputs = req.body;
  first_name = inputs['first_name'];
  last_name = inputs['last_name'];
  email = inputs['email'];
  password = inputs['password'];

  // console.log(first_name+" subscribed to mail list");
  res.sendFile(__dirname+'/success.html')

})

app.listen(port, () => {
  console.log("Go to http://localhost:"+port);
})

// API key
// e3fce90dd39e1c0984147a6a702875ea-us17
