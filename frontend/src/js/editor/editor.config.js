function EditorConfig($stateProvider, $httpProvider) {
    'ngInject';
  
    $stateProvider
  
    .state('app.editor', {
        url: '/editor/:slug',
        controller: 'EditorCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'editor/editor.html',
        title: 'Recipes Editor',
        resolve:{
          auth: function(User) {
            return User.ensureAuthIs(true);
          },
          food: function(Foods, User, $state, $stateParams) {
            if ($stateParams.slug) {
    
              return Foods.getFood($stateParams.slug).then(
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
  
  export default EditorConfig;
  