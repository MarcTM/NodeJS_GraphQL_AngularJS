class ProductsCtrl {
    constructor(Product, products, $state) {
      'ngInject';
  
      this._Product = Product;
      this.products = products;
      this._$state = $state;
      
    }
  
}
  
export default ProductsCtrl;