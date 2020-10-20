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

    .state("app.filterFoods", {
      url: "/foods_:filter",
      controller: "FilterFoodsCtrl",
      controllerAs: "$ctrl",
      templateUrl: "foods/filterfoods.html",
      title: "Foods",
      resolve: {
        foods: function(Foods) {
          return Foods.getFoods().then(foods => foods)
        }
      }
    })

    .state('app.detailsFood', {
        url: '/foods/:slug',
        controller: 'FoodCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'foods/food.html',
        title: 'Details Food',
        resolve: {
          food: function(Foods, $stateParams) {
            return Foods.getFood($stateParams.slug).then(food => food);
          },
          comments: function(Comments, $stateParams) {
            return Comments.getAll($stateParams.slug).then(comments => comments);
          }
        }
      })

  };
  
  export default FoodsConfig;
  