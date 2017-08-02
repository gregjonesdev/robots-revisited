const express = require('express');
const mustache = require('mustache-express');
const app = express();
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/robot';
app.use(express.static('public'))

app.listen(3000);

app.get('/working', function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to the database');
    }

    db.collection('robots')
      .find()
      .toArray( function(err, robots){

        res.render("working", {robots: robots})
      })
  })
})

app.get('/notworking', function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to the database');
    }

    db.collection('robots')
      .find()
      .toArray( function(err, robots){

        res.render("notworking", {robots: robots})
      })
  })
})

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
})



app.get('/:id', function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to the database');
    }

  db.collection('robots')
    .find({"id": parseInt(req.params.id)})
    .toArray( function(err, robots){

      res.render("id", {robots: robots})
    })
})
})
