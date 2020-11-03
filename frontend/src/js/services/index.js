import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import GraphQLClientService from './graphql.service';
servicesModule.service('GraphQLClient', GraphQLClientService);

import ProductService from './product.service';
servicesModule.service('Product', ProductService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import FoodsService from './foods.service';
servicesModule.service('Foods', FoodsService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);


export default servicesModule;
