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

import FoodCtrl from './food.controller';
foodsModule.controller('FoodCtrl', FoodCtrl);

import RecipesCtrl from './recipes.controller';
foodsModule.controller('RecipesCtrl', RecipesCtrl);

import CommentFood from './comment-food.component';
foodsModule.component('commentFood', CommentFood);



export default foodsModule;
