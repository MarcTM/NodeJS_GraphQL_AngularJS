import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import FavoriteFoodBtn from './buttons/favorite-food-btn.component';
componentsModule.component('favoriteFoodBtn', FavoriteFoodBtn);

import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);

import FoodsList from './foods-helpers/foods-list.component';
componentsModule.component('foodsList', FoodsList);

import FoodsPreview from './foods-helpers/foods-preview.component';
componentsModule.component('foodsPreview', FoodsPreview);

import FoodActions from './foods-helpers/food-actions.component';
componentsModule.component('foodActions', FoodActions);

import ListPagination from './article-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);

import ListPaginationFoods from './foods-helpers/list-pagination-foods.component';
componentsModule.component('listPaginationFoods', ListPaginationFoods);

export default componentsModule;
