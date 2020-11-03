function ProductsConfig($stateProvider, $httpProvider) {
    'ngInject';
  
    $stateProvider
  
    .state('app.products', {
        url: '/products',
        controller: 'ProductsCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'products/products.html',
        title: 'Products GraphQL',
        resolve: {
            products: function(Product, $state, $stateParams) {
              return Product.products().then(
                (data) => {
                    console.log(data);
                    return data.products;
                },
                (err) => {
                  console.log(err);
                  $state.go($state.current.name)
                }
              )
            }
          }

        
      })


  };
  
  export default ProductsConfig;
  