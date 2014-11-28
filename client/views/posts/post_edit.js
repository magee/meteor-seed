Template.postEdit.events({
  'click .form-control': function(e) {
    console.log('----------------------------------------------------------');
    console.log(this.toString(), this._id);
    for (prop in this) {
      console.log(prop + ': ' + this[prop]);
    }
    console.log('----------------------------------------------------------');
  },
  'submit form': function(e) {
    e.preventDefault();
    // tTODO: he following line doesn't work.  problem parsing url params.  need to debug
    // var currentPostId = this._id;
    var currentPostId = Session.get('postID');
    // console.log('----------------------------------------------------------');
    // console.log("currID: " + currentPostId + ", sessionID: " + sessionPostId);
    // console.log('----------------------------------------------------------');

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
