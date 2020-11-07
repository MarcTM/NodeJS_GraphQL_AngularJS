import angular from 'angular';

// Create the module where our functionality can attach to
let productsModule = angular.module('app.products', []);

// Include our UI-Router config settings
import ProductsConfig from './products.config';
productsModule.config(ProductsConfig);


// Include controllers
import EditorProductsCtrl from './editor-products.controller';
productsModule.controller('EditorProductsCtrl', EditorProductsCtrl);


// Include controllers
import ProductsCtrl from './products.controller';
productsModule.controller('ProductsCtrl', ProductsCtrl);


export default productsModule;
