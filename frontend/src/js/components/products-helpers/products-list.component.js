class ProductsListCtrl {

    constructor(Product, $scope, $state){
      "ngInject";
  
      this._$scope = $scope;
      this._Product = Product;

    }

  }
  

  let ProductsList = {
    controller: ProductsListCtrl,
    templateUrl: 'components/products-helpers/products-list.html'
  };

  export default ProductsList;
  