Template.postShow.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});
