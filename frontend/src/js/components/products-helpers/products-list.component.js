class ProductsListCtrl {

    constructor(Product, $scope, $state){
      "ngInject";
  
      this._$scope = $scope;
      this._Product = Product;

      this.products = Product.getProducts().then((data)=> {return data.products});
      console.log(this.products);

    }




  }
  

  let ProductsList = {
    controller: ProductsListCtrl,
    templateUrl: 'components/products-helpers/products-list.html'
  };

  export default ProductsList;
  