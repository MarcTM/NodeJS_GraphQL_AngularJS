class CommentFoodCtrl {
    constructor(User) {
      'ngInject';
  
        this.$onInit = () => {
            if (User.current) {
              if (User.current.username === this.foodAuthor.username){
                this.canModify = true;
              }else if (User.current.username === this.data.author.username){
                this.canModify = true;
              }else{
                this.canModify = false;
              }
            } else {
                this.canModify = false;
            }
        }

    }
  }
  
  let CommentFood = {
    bindings: {
      data: '=',
      foodAuthor: '=',
      deleteCb: '&'
    },
    controller: CommentFoodCtrl,
    templateUrl: 'foods/comment-food.html'
  };
  
  export default CommentFood;
  