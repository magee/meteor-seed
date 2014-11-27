Template.postNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      image: $(e.target).find('[name=image]').val(),
      content: $(e.target).find('[name=content]').val()
    }

    Meteor.call('post', post, function(error, id) {
      if (error)
        return alert(error.reason);

      Router.go('postShow', {_id: id});
    });
  }
});

Template.postNew.rendered = function() {
  $('.postEdit').remove();
  $('.postDelete').remove();
};
