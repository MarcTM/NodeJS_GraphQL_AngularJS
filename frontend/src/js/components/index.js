import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import FavoriteFoodBtn from './buttons/favorite-food-btn.component';
componentsModule.component('favoriteFoodBtn', FavoriteFoodBtn);

import FoodsList from './foods-helpers/foods-list.component';
componentsModule.component('foodsList', FoodsList);

import FoodsPreview from './foods-helpers/foods-preview.component';
componentsModule.component('foodsPreview', FoodsPreview);

import FoodActions from './foods-helpers/food-actions.component';
componentsModule.component('foodActions', FoodActions);

import ListPaginationFoods from './foods-helpers/list-pagination-foods.component';
componentsModule.component('listPaginationFoods', ListPaginationFoods);

import ProductsList from './products-helpers/products-list.component';
componentsModule.component('productsList', ProductsList);

export default componentsModule;
