var mongoose = require('mongoose');
require('./User');
const User = mongoose.model('User');

var ProductSchema = new mongoose.Schema({
  name: {type: String, required: [true, "can't be blank"]},
  description: {type: String, required: [true, "can't be blank"]},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

mongoose.model('Product', ProductSchema);
