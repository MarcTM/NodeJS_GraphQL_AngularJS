function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
      difficulty: function(Foods) {
        return Foods.getDifficulty().then(
          (difficulty) => difficulty
        )
      }
    }
  });

};

export default HomeConfig;
