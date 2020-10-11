class CommentFoodCtrl {
    constructor(User) {
      'ngInject';
  
        this.$onInit = () => {
            if (User.current) {
                this.canModify = (User.current.username === this.data.author.username);
            } else {
                this.canModify = false;
            }
        }

    }
  }
  
  let CommentFood = {
    bindings: {
      data: '=',
      deleteCb: '&'
    },
    controller: CommentFoodCtrl,
    templateUrl: 'foods/comment-food.html'
  };
  
  export default CommentFood;
  