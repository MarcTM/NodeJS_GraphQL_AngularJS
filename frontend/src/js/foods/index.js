import angular from 'angular';

// Create the module where our functionality can attach to
let foodsModule = angular.module('app.foods', []);

// Include our UI-Router config settings
import FoodsConfig from './foods.config';
foodsModule.config(FoodsConfig);


// Include controllers
import FoodsCtrl from './foods.controller';
foodsModule.controller('FoodsCtrl', FoodsCtrl);

import FilterFoodsCtrl from './filterfoods.controller';
foodsModule.controller('FilterFoodsCtrl', FilterFoodsCtrl);

import DetailsFoodCtrl from './detailsfood.controller';
foodsModule.controller('DetailsFoodCtrl', DetailsFoodCtrl);

import RecipesCtrl from './recipes.controller';
foodsModule.controller('RecipesCtrl', RecipesCtrl);


export default foodsModule;
