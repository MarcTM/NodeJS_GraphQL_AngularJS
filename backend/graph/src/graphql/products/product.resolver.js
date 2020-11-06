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
      newProduct: (_, {input}) => {
          let product = new Product(input);
          product.save();
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