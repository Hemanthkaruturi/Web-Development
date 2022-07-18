const date = require(__dirname+'/date.js');

const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000;

var list_items = ["Buy Food","Cook Food","Eat Food"]
var work_items = ["Check emails", "prepare deck", "Attend meeting"]

app.get("/", (req,res) => {
  // res.sendFile(__dirname+'/index.html');

  day = date.getDate();
  res.render("list",{'msg':day, 'newlistitems':list_items, 'route_to':'response'});
})

app.post("/response", (req,res) => {
  inputs = req.body;
  console.log(inputs)
  list_item = inputs['new_item'];
  if (inputs.hasOwnProperty('add')) {
    console.log('Adding Item...');
    list_items.push(list_item);
    console.log(list_items);
    res.redirect("/");
  }
  else if (inputs.hasOwnProperty('delete')) {
    for (let i=0;i<list_items.length;i++){
      if (list_items[i] == list_item) {
        list_items.splice(i,1);
        console.log('Deleting Item... '+list_item)
      }
    }
    // list_items.pop(list_item);
    // console.log(list_items);
    res.redirect("/");
  }
  else {
    res.send('Oh oh! Something gone wrong')
  }
})

// work logic
app.get("/work", (req,res) => {
  // res.sendFile(__dirname+'/index.html');
  day = date.getDate();
  res.render("list",{'msg':day, 'newlistitems':work_items, 'route_to':'work-response'});
})

app.post("/work-response", (req,res) => {
  inputs = req.body;
  console.log(inputs)
  list_item = inputs['new_item'];
  if (inputs.hasOwnProperty('add')) {
    console.log('Adding Item...');
    work_items.push(list_item);
    console.log(work_items);
    res.redirect("/work");
  }
  else if (inputs.hasOwnProperty('delete')) {
    for (let i=0;i<work_items.length;i++){
      if (work_items[i] == list_item) {
        work_items.splice(i,1);
        console.log('Deleting Item... '+list_item)
      }
    }
    // list_items.pop(list_item);
    // console.log(list_items);
    res.redirect("/work");
  }
  else {
    res.send('Oh oh! Something gone wrong')
  }
})

app.listen(port, () => {
  console.log("Go to http://localhost:"+port);
})
