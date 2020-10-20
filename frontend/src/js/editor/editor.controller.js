class EditorCtrl {
    constructor(Foods, food, $state) {
      'ngInject';
  
      console.log(food);
      this._Foods = Foods;
      this._$state = $state;
      this.toUpdate = false;
  
      if (!food) {
        this.food = {
          title: '',
          description: '',
          body: '',
          difficulty: '',
          tagList: []
        }
      } else {
        this.food = food;
        this.toUpdate = true;
      }
  
    }
  
  
    addTag() {
      if (!this.food.tagList.includes(this.tagField)) {
        this.food.tagList.push(this.tagField);
        this.tagField = '';
      }
      console.log(this.food.tagList);
    }
  
    removeTag(tagName) {
      this.food.tagList = this.food.tagList.filter((slug) => slug != tagName);
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
  
  export default EditorCtrl;