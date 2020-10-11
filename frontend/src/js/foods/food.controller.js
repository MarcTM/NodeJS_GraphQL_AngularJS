class FoodCtrl {
    constructor(food, comments, User, Comments) {
      'ngInject';
  
      this.food = food;
      this._Comments = Comments;

      this.currentUser = User.current;
      this.comments = comments;

      this.resetCommentForm();
    }


    resetCommentForm() {
      this.commentForm = {
        isSubmitting: false,
        body: '',
        errors: []
      }
    }
  
    addComment(){
      this.commentForm.isSubmitting = true;
  
      this._Comments.add(this.food.slug, this.commentForm.body).then(
        (comment) => {
          this.comments.unshift(comment);
          this.resetCommentForm();
        },
        (err) => {
          this.commentForm.isSubmitting = false;
          this.commentForm.errors = err.data.errors;
        }
      )
    }
  
    deleteComment(commentId, index) {
      this._Comments.destroy(commentId, this.food.slug).then(
        (success) => {
          this.comments.splice(index, 1);
        }
      )
    }

  }
  
  export default FoodCtrl;
  