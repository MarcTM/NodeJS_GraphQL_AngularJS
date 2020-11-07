function ProductsConfig($stateProvider, $httpProvider) {
    'ngInject';
  
    $stateProvider
  

    .state('app.newproduct', {
      url: '/editorproduct/:slug',
      controller: 'EditorProductsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'products/editor.html',
      title: 'Products Editor',
    })


    .state('app.products', {
        url: '/products',
        controller: 'ProductsCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'products/products.html',
        title: 'Products GraphQL',
      })


  };
  
  export default ProductsConfig;
  