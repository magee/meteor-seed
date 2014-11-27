Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('post', function(id) {
  return id && Posts.find(id);
});
