const mongoose = require('mongoose');
const { hashSync, compareSync } = require('bcryptjs');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

schema.virtual('password').get(function(password) {
  this.passwordHash = hashSync(password, 10);
});

schema.methods.compare = function(password) {
  return compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('User', schema);