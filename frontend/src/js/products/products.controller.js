class ProductsCtrl {
    constructor(Product, products, $state) {
      'ngInject';
  
      this._Product = Product;
      this.products = products;
      this._$state = $state;
      
    }
  
    submit(){
      this._Product.newProduct(this.formData).then(
        (data) => {
            console.log(data);
        },
        (err) => {
          console.log(err);
          console.log("error");
        }
      )
    }
  
}
  
export default ProductsCtrl;