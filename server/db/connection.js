const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = process.env.CONNECTION_URL
const DATABASE_NAME = process.env.DATABASE_NAME

let db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(CONNECTION_URL, function (err, client) {
      db = client.db(DATABASE_NAME);
      console.log('Connected to database: ' + DATABASE_NAME);
      return callback(err);
    });
  },
  getDb: function () {
    return db;
  }
};