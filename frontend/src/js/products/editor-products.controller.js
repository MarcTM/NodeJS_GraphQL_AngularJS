class EditorProductsCtrl {
    constructor(Product, $state) {
      'ngInject';
  
      this._Product = Product;
      this._$state = $state;
      this.toUpdate = false;
  
        this.product = {
          name: '',
          description: '',
        }
  
    }
  
  
    submit() {
      this.isSubmitting = true;

      if(this.product.name && this.product.description){
        this._Product.newProduct(this.product).then(
            (data) => {
                this._$state.go('app.products');
            },
            (err) => {
              console.log(err);
            }
          )
      }else{
          console.log("something is missing")
      }

      
    }
  }
  
  export default EditorProductsCtrl;