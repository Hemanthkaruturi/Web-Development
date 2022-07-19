//jshint esversion:6

const express = require("express");
const app = express()

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const ejs = require("ejs");
app.set('view engine', 'ejs');

const port = 3000

// Connect to mongodb
const mongoose = require("mongoose");
const url = 'mongodb+srv://analytics:Hem%40nth_1996@learningcluster.n1doj.mongodb.net/postsDB'
mongoose.connect(url);

const postsSchema = new mongoose.Schema({
  postUrl: {
    type: String,
    required: true,
    unique: true
  },
  postTitle: {
    type: String,
    required: true,
    unique: true
  },
  postContent: {
    type: String,
    required: true
  },
  postedDate: {type: Date, default: Date.now}
})

var uniqueValidator = require('mongoose-unique-validator');
postsSchema.plugin(uniqueValidator);

// Create model
const Post = mongoose.model("Post", postsSchema)

app.route("/posts")
  .get((req,res) => {
  Post.find((err, foundPosts) => {
    if (!err) {
      console.log(foundPosts)
      res.send(foundPosts)
    } else {
      res.send(err)
    }

  })
})
.post((req,res) => {
  title = req.body.title
  postUrl = title.toLowerCase();
  postUrl = postUrl.replace(' ','-');
  const newPost = new Post({
    postUrl: postUrl,
    postTitle: req.body.title,
    postContent: req.body.content
  })

  newPost.save().then((err, result) => {
    if (!err) {
      res.send("Post added!")
    } else {
      res.send(err)
    }
  })
})
.delete((req,res) => {
  Post.deleteMany((err) => {
      if (!err) {
        res.send("Deleted the articles!")
      } else {
        res.send("Unable to perform this operation!")
      }
    }
  )
})

app.route("/posts/:topic")
  .get((req,res) => {
    postUrl = req.params.topic
    Post.findOne({postUrl: postUrl} ,(err, foundPosts) => {
      if (!err) {
        console.log(foundPosts)
        res.send(foundPosts)
      } else {
        res.send(err)
      }

    })
  })
  .delete((req,res) => {
    postUrl = req.params.topic
    Post.deleteOne(
      {postUrl: postUrl},
      (err) => {
        if (!err) {
          res.send("Deleted the articles!")
        } else {
          res.send("Unable to perform this operation!")
        }
      }
    )
  })
  .put((req,res) => {
    postUrl = req.params.topic
    newTitle = req.body.title
    newContent = req.body.content
    console.log(newTitle);
    console.log(newContent);
    Post.replaceOne(
      {postUrl: postUrl},
      {postTitle: newTitle, postContent: newContent},
      (err, result) => {
        if(!err) {
          console.log(result);
        } else {
          console.log(err);
        }
      }
    )
    res.send("Updated records!")
  })
  .patch((req,res) => {
    postUrl = req.params.topic
    Post.updateOne(
      {postUrl: postUrl},
      {$set: req.body},
      (err) => {
        if(!err) {
          res.send('Updated successfully!')
        } else {
          res.send(err)
        }
      }
    )
  })


app.listen(port, function() {
  console.log("Server started on port 3000");
});
