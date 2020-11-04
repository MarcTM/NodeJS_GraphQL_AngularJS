const mongoose = require('mongoose');
const Product = mongoose.model('Product');

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
    }
};

module.exports = ProductResolvers;