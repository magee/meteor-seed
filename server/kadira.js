Meteor.startup(function() {
  Kadira.connect(process.env.KADIRA_APPID, process.env.KADIRA_APPSECRET);
});
