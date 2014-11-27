// leave router in location where it can be accessed by server and client so that fast-render package will work.
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });

  // for accounts-admin-ui-bootstrap-3 integration
  this.route('admin', {
    path:'/admin',
    template: 'accountsAdmin',
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
          this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
          console.log('redirecting');
          this.redirect('/');
      }
    }
  });

  this.route('posts', {
    path: '/posts',
    waitOn: function() {
      return Meteor.subscribe('posts');
    },
    data: function() {
      return Meteor.subscribe('posts');
    },
    fast-render: true
  });

  this.route('postShow', {
    path: '/posts/:_id',
    waitOn: function() {
      return Meteor.subscribe('post', this.params._id);
    },
    data: function() {
      return Posts.findOne(this.params._id);
    }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() {
      return Meteor.subscribe('post', this.params._id);
    },
    data: function() {
      return Posts.findOne(this.params._id);
    }
  });

  this.route('dashboard', {
    path: '/admin'
  });

  this.route('postNew', {
    path: '/admin/post'
  });

});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'dashboard'});
