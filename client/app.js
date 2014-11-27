if (Meteor.isServer) {
  Meteor.startup(function () {
    /*
    Follow the instructions under https://atmospherejs.com/mrt/accounts-admin-ui-bootstrap-3 to setup app for admin roles
    */
    // bootstrap the admin user if they exist -- You'll be replacing the id later
    if (Meteor.users.findOne("your_admin_user_id")){
      Roles.addUsersToRoles("your_admin_user_id", ['admin']);
    }

    // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
    if(!Meteor.roles.findOne({name: "secret"})){
      Roles.createRole("secret");
    }

    if(!Meteor.roles.findOne({name: "double-secret"})){
      Roles.createRole("double-secret");
    }
  });
}

if (Meteor.isClient) {
  Template.adminTemplate.helpers({
    // check if user is an admin
    isAdminUser: function() {
      return Roles.userIsInRole(Meteor.user(), ['admin']);
    }
  });
}
