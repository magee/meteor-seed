Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('post', function(id) {
  return id && Posts.find(id);
});

Meteor.publish(null, function (){
  return Meteor.roles.find({})
});
