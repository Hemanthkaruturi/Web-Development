const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const url = 'mongodb+srv://analytics:Hem%40nth_1996@learningcluster.n1doj.mongodb.net/fruitsDB'

mongoose.connect(url);

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: String
});

fruitSchema.plugin(uniqueValidator);

const Fruit = mongoose.model("Fruit", fruitSchema);

// const pineapple = new Fruit({
//   name: 'Pineapple',
//   rating: 5,
//   review: 'Such a good fruit!'
// })

// pineapple.save();

Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    // mongoose.connection.close();
    // for (let i=0;i<fruits.length;i++) {
    //   console.log(fruits[i]['name'])
    // }
    // console.log(fruits);
    fruits.forEach((fruit) => {
      console.log(fruit.name)
    })
  }
});

// const fruit = new Fruit({
//   name: "Apple",
//   rating: 4,
//   review: "Taste little bitter"
// })
//
// fruit.save();
//
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 3,
//   review: "I don't like this fruit"
// })
//
// kiwi.save();
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 5,
//   review: "So sweet, I like it!"
// })
//
// banana.save();

// update data
// Fruit.updateOne({name:'Pineapple'},{rating:4.8},(err) => {
//   if(err) {
//     console.log(err);
//   } else {
//       console.log("Able to update the document");
//   }
// });

// delete data
// Fruit.deleteOne({name:'Pineapple'}, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Deleted the record');
//   }
// })

// create person
// const personSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please incluse person name"]
//   },
//   age: Number
// })
//
// const Person = new mongoose.model("Person", personSchema)

// Adding John record
// const john = new Person({
//   name: 'John',
//   age: 37
// })

// john.save();
// console.log("John added..");

// Person.find((err,result) => {
//   if(err){
//     console.log(err);
//   } else {
//     result.forEach((person) => {
//       console.log(person);
//     })
//   }
// })

// Embeded documents
// create person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please incluse person name"]
  },
  age: Number,
  favouriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema)

const pineapple = new Fruit({
  name: 'Pineapple',
  rating: 4.8,
  review: 'This is my favourite fruit'
})

// pineapple.save()

const person = new Person({
  name: 'Amy',
  age: 12,
  favouriteFruit: pineapple
});

// person.save()

// update
const orange = new Fruit({
  name: 'Orange',
  rating: 4.4,
  review: 'Sweet!'
})

// orange.save()

// Person.updateOne({name:'John'},{favouriteFruit:orange},(err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Updated the record!");
//   }
// })

Person.find((err,result) => {
  if(err){
    console.log(err);
  } else {
    result.forEach((person) => {
      console.log(person);
    })
  }
})
