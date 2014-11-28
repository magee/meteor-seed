if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('starting admin bootstrap');

    if (Meteor.users.findOne("rcABZ7Hjoohqgb434")){
      console.log('adding roles to magee');
      Roles.addUsersToRoles(["rcABZ7Hjoohqgb434"], ['admin', 'user-admin'], Roles.GLOBAL_GROUP);
    }
    if (Meteor.users.findOne("user2")){
      Roles.addUsersToRoles("user2", ['editor']);
    }
    if (Meteor.users.findOne("user3")){
      Roles.addUsersToRoles("user3", ['reader']);
    }

    // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
    if(!Meteor.roles.findOne({name: "admin"})){
      Roles.createRole("admin");
    }
    if(!Meteor.roles.findOne({name: "user-admin"})){
      Roles.createRole("user-admin");
    }
    if(!Meteor.roles.findOne({name: "editor"})){
      Roles.createRole("editor");
    }
    if(!Meteor.roles.findOne({name: "reader"})){
      Roles.createRole("reader");
    }
  });
}

// if (Meteor.isClient) {
//   Template.adminTemplate.helpers({
//     // check if user is an admin
//     isAdminUser: function() {
//       return Roles.userIsInRole(Meteor.user(), ['admin']);
//     }
//   });
// }
