const fetch = require('node-fetch');
const axios = require('axios');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const User = mongoose.model('User');

const ProductResolvers = {
    Query: {
      product: (_, {name}) => {
        return Product.findOne({name: name}).exec();
      },
      products: () => {
        return Product.find().exec();
      },
    },
    Mutation: {
      newProduct: (_, {name, description}, context) => {
          if (!context.user) throw new context.AuthenticationError('You must be logged in');

          let input = {name: name, description: description, user: context.user.id};
          let product = new Product(input);
          product.save();

          let postInput = {id: context.user.id};
          fetch('http://0.0.0.0:3000/api/profiles/updatekarma', {
              method: 'POST',
              body: JSON.stringify(postInput),
              headers: { 'Content-Type': 'application/json' }
          });

          axios.post('http://0.0.0.0:3000/api/profiles/updateproducts', postInput);

          return product;
      }
    },
    Product: {
      user: (parent) => {
          return User.findOne({_id: parent.user}).exec();
      }
    }
};

module.exports = ProductResolvers;