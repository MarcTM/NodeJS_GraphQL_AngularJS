class RecipesCtrl {
  constructor(Foods, food, $state) {
    'ngInject';

    this._Foods = Foods;
    this._$state = $state;

    if (!food) {
      this.food = {
        title: '',
        description: '',
        body: '',
        difficulty: ''
      }
    } else {
      this.food = food;
    }

  }


  submit() {
    this.isSubmitting = true;

    this._Foods.save(this.food).then(
      (newFood) => {
        this._$state.go('app.detailsFood', { slug: newFood.slug });
      },

      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }

    )
  }



}

export default RecipesCtrl;