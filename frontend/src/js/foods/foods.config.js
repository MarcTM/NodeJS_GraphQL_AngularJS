function FoodsConfig($stateProvider, $httpProvider) {
    'ngInject';
  
    $stateProvider
  
    .state('app.foods', {
      url: '/foods',
      controller: 'FoodsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'foods/foods.html',
      title: 'Foods',
      resolve: {
        foods: function(Foods) {
          return Foods.getFoods().then(foods => foods)
        }
      }
    })

    .state('app.detailsFood', {
        url: '/foods/:slug',
        controller: 'DetailsFoodCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'foods/detailsfood.html',
        title: 'Details Food',
        resolve: {
          food: function(Foods, $stateParams) {
            return Foods.getFood($stateParams.slug).then(food => food);
          }
        }
      });
  
  };
  
  export default FoodsConfig;
  