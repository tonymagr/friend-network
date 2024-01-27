const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/socialDB")
  .then(() => console.log('Connected to db'))
  .catch(err => console.log(err));

// Export connection
module.exports = mongoose.connection;