const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb+srv://analytics:Hem%40nth_1996@learningcluster.n1doj.mongodb.net/test'

const dbName = 'shopDB'

const client = new MongoClient(url);

client.connect(function(err) {
  assert.equal(null,err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  findDocuments(db, function(result){
    console.log(result);
    client.close();
  })

  // insertDocuments(db, function() {
  //   client.close();
  // })

});

function insertDocuments(db, callback) {
  const collection = db.collection('products');
  collection.insertMany([
    {name:"Scale", price:2, stock:8},
    {name:"Compass", price:5.2, stock:10}
  ], function(err, result){
    assert.equal(err, null);
    // assert.equal(2, result.result.n);
    // assert.equal(2, result.ops.length);
    console.log("Inserted 2 documents in to the collection");
    callback(result);
  })
}

function findDocuments(db, callback) {
  const collection = db.collection('products');
  collection.find(
    {name:"Scale"},{name:1}
  ).toArray(function(err, result){
    assert.equal(err, null);
    // assert.equal(2, result.result.n);
    // assert.equal(2, result.ops.length);
    console.log("Found the records");
    callback(result);
  });
}
