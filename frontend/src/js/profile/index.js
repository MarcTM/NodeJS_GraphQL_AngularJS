import angular from 'angular';

// Create the module where our functionality can attach to
let profileModule = angular.module('app.profile', []);

// Include our UI-Router config settings
import ProfileConfig from './profile.config';
profileModule.config(ProfileConfig);

// Controllers
import ProfileCtrl from './profile.controller';
profileModule.controller('ProfileCtrl', ProfileCtrl);

import ProfileFoodsCtrl from './profile-foods.controller';
profileModule.controller('ProfileFoodsCtrl', ProfileFoodsCtrl);


export default profileModule;
