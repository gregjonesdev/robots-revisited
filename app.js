const express = require('express');
const mustache = require('mustache-express');
const app = express();
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/robot';

app.listen(3000);

app.get('/', function(req,res){

  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to the database');
    }

    db.collection('robots')
      .find()
      .toArray( function(err, robots){

        res.render("index", {robots: robots})
      })
  })
});
