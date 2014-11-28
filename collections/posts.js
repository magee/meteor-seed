Posts = new Mongo.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'title', 'image', 'content').length > 0);
  }
});

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
        now = moment().format('MM/DD/YYYY, hh:mm A'),
        postWithSameTitle = Posts.findOne({title: postAttributes.title});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, 'You need to login to post new stories');

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please add a title');

    // ensure the post has an image
    if (!postAttributes.image)
      throw new Meteor.Error(422, 'Please add an image url');

    // ensure the post has content
    if (!postAttributes.content)
      throw new Meteor.Error(422, 'Please add post content');

    // check that there are no previous posts with the same link
    if (postAttributes.title && postWithSameTitle) {
      throw new Meteor.Error(302,
        'This link has already been posted',
        postWithSameTitle._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'title', 'image', 'content'), {
      userId: user._id,
      author: user.username,
      submitted: now
    });

    var postId = Posts.insert(post);

    return postId;
  }
});
