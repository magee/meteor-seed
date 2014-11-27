Meteor.startup(function() {

  if (Meteor.users.find({username: 'admin'}).count() < 1) {
    var adminId = Accounts.createUser({
      'username': 'admin',
      'password': 'admin',
      'profile': {
        'name': 'Hiro Protagonist',
        'email': 'damir@withpulp.com'
      }
    });

    Roles.addUsersToRoles(Meteor.users.find({
      username: 'admin'
    }).fetch(), ['admin']);
  }

  if (Posts.find().count() === 0) {
    var admin = Meteor.users.findOne(adminId),
        now = moment().format('MM/DD/YYYY, hh:mm A');

    for (var i = 0; i < 10; i++) {
      Posts.insert({
        title: 'Post ' + i,
        image: 'http://placehold.it/800x400',
        content: 'Post content ' + i + '.',
        userId: admin._id,
        author: admin.profile.name,
        submitted: now,
        commentsCount: 0
      });
    }
  }

});
