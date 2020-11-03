var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, required: [true, "can't be blank"]},
  description: {type: String, required: [true, "can't be blank"]},
}, {timestamps: true});

mongoose.model('Product', ProductSchema);
