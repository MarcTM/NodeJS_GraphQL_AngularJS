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

      .state('app.recipes', {
        url: '/recipes/:slug',
        controller: 'RecipesCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'foods/recipes.html',
        title: 'Recipes Food',
        resolve:{
          auth: function(User) {
            return User.ensureAuthIs(true);
          },
          food: function(Foods, User, $state, $stateParams) {
            if ($stateParams.slug) {
    
              return Foods.get($stateParams.slug).then(
                (food) => {
                  if (User.current.username === food.author.username) {
                    return food;
                  } else {
                    $state.go('app.home');
                  }
                },
                (err) => $state.go('app.home')
              )
    
            } else {
              return null;
            }
    
          }
        }
      })

  };
  
  export default FoodsConfig;
  