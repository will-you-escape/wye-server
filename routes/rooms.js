const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const mongoUri = process.env.MONGODB_URI;
const roomsCollection = "wye-rooms";

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(mongoUri, function(err, db) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected correctly to server");
    }
    findRooms(db, function(rooms) {
      db.close();
      res.render('rooms', { 
        title: 'Will You Escape - Rooms',
        rooms: rooms,
        activeMenu: 'rooms'
      });
    });
    

  });
});

const findRooms = function(db, callback) {
  const collection = db.collection(roomsCollection);
  collection.find({}).toArray(function(err, docs) {
    callback(docs);
  });
};

module.exports = router;