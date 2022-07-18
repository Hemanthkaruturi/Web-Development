const date = require(__dirname+'/date.js');

// import lodash
const _ = require("lodash")

// Connect to mongodb
const mongoose = require("mongoose");
const url = 'mongodb+srv://analytics:Hem%40nth_1996@learningcluster.n1doj.mongodb.net/todolistDB'
mongoose.connect(url);

const listItemSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model('listItem',listItemSchema)

const todolistSchema = new mongoose.Schema({
  name: String,
  items: [listItemSchema]
})

const List = mongoose.model("List", todolistSchema)

const item1 = new Item({
  name: 'Item 1'
})

const item2 = new Item({
  name: 'Item 2'
})

const item3 = new Item({
  name: 'Item 3'
})

// create default items
const defaultList = [item1, item2, item3]
// const defaultList = new List({
//   name: "default",
//   items: ['Eat Food', 'Cook Food', 'Buy Food']
// });

// create express app
const express = require("express");
const app = express();

// set ejs engine
app.set('view engine', 'ejs');

app.use(express.static("public"));

// create body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

// change port if required
const port = 3000;

// Initial list items -- get default items from db
// let list_items = []
// const list_items = []
// Item.find((err, items) => {
//   if(err) {
//     console.log(err);
//   } else {
//     items.forEach((item) => {
//       console.log(item.name);
//       list_items.push(item.name)
//     })
//   }
// })

// var list_items = ["Buy Food","Cook Food","Eat Food"]
var work_items = ["Check emails", "prepare deck", "Attend meeting"]

// function refreshItemList(){
//   const _list_items = []
//   Item.find((err, items) => {
//     if(err) {
//       console.log(err);
//     } else {
//       items.forEach((item) => {
//         console.log(item.name);
//         _list_items.push(item.name)
//       })
//     }
//   })
//   console.log(_list_items);
//   return _list_items
// }

// push items to DB
// function pushNewItem(item) {
//   const newItem = new Item({
//     name:item
//   })
//
//   newItem.save()
//
//   // list_items = refreshItemList()
//
//   // return list_items
// }

app.get("/", (req,res) => {
  // res.sendFile(__dirname+'/index.html');

  List.find((err,items) => {
    if(err) {
      console.log(err);
    } else {
      if (items.length == 0) {
        List.insertMany(defaultItems, (err) => {
          if(err) {
            console.log(err);
          } else {
            console.log("Successfully inserted default items");
          }
        })
        res.redirect("/")
      } else {
        day = date.getDate();
        topic = 'default'
        List.findOne({name:topic}, (err, items) => {
          if(err){
            console.log(err);
          } else {
            // console.log(item);
            if (!items) {
              // console.log("Item does not exists");
              const list = new List({
                name: topic,
                items: defaultList
              })
              list.save()
            } else {
              // show existing list
              // console.log('List Title: '+ items.name + ' List items: '+items.items)
              res.render("list",{'listTitle':items.name ,'newlistitems':items.items, 'route_to':'response'});
              // console.log("Item exists");
            }
          }
        })
      }

    }
  })
  // console.log(list_items);

})

app.post("/response", (req,res) => {
  inputs = req.body;
  // console.log(inputs)
  newItem = inputs['new_item']
  add_to = inputs['add']

  const item = new Item({
    name: newItem
  })

  List.findOne({name:add_to}, (err, foundItem) => {
    foundItem.items.push(item)
    foundItem.save()
    res.redirect("/"+add_to);
  })

})

app.post("/delete", (req,res) => {
  // console.log(req.body);
  listName = req.body.listName;
  delete_id = req.body.check;

  List.findOneAndUpdate(
    {name:listName},
    {$pull:{items:{_id:delete_id}}},
    (err, results) => {
      console.log(results);
    }
  )

  res.redirect("/"+listName)
})

app.get("/:topic", (req,res) => {
  topic = _.capitalize(req.params.topic)

  List.findOne({name:topic}, (err, items) => {
    if(err){
      console.log(err);
    } else {
      // console.log(item);
      if (!items) {
        // console.log("Item does not exists");
        const list = new List({
          name: topic,
          items: defaultList
        })
        list.save()
        res.redirect("/"+topic)
      } else {
        // show existing list
        // console.log('List Title: '+ items.name + ' List items: '+items.items)
        res.render("list",{'listTitle':items.name ,'newlistitems':items.items, 'route_to':'response'});
        // console.log("Item exists");
      }
    }
  })

})


app.listen(port, () => {
  console.log("Go to http://localhost:"+port);
})
