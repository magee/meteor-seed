Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      image: $(e.target).find('[name=image]').val(),
      content: $(e.target).find('[name=content]').val()
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('postShow', {_id: currentPostId});
      }
    });
  },
  'click .postDelete': function(e) {
    e.preventDefault();

    if (confirm('Delete this post?')) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('posts');
    }
  }
});

Template.postEdit.rendered = function() {
  $('.postNew').remove();
};
