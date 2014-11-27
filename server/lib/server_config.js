/*
  Example: create a setting for each using process.env.FOO where FOO is one or more of these
  BIND IP: bind to a specific IP address (optional)

  EMAIL_URL: how Meteor will send email, SMTP settings etc. (required to send email)
  HTTP_FORWARDED_COUNT: set this with the number of proxies Meteor is running behind (optional)
  METEOR_SETTINGS: various runtime settings, see link (optional)
  MONGO_URL: URL for connecting to Mongo (required in production)
  MONGO_OPLOG_URL: URL for Mongo (optional)
  NODE_ENV: not required by Meteor but set to 'PRODUCTION' by most node.js Category:PaaS_providers.
  NODE_OPTIONS: Used in development (i.e. via Meteor-run) to pass additional options to node (like --debug). Optional.
  PORT: What port to listen on (optional, defaults to 3000)
  ROOT_URL: Default URL for how your app should be accessed (required on production)
  DISABLE WEBSOCKETS: Set to 1 to disable trying websockets first before falling back to sockjs emulation

  See http://www.meteorpedia.com/read/Environment_Variables for more details
  Info on deploying applications: http://docs.meteor.com/#/full/deploying
*/

// Required for deployment in production on non-meteor hosting site
// ROOT_URL = "http://foo.example.com"
Meteor.startup(function () {
  /*
    Security setup - the following settings configure the use of the browser-policy package.
    See https://atmospherejs.com/meteor/browser-policy for defaults on configuring browser security.
  */

  // disable only if your app requires use of inline Javascript - default policy allows inline scripts
  BrowserPolicy.content.disallowInlineScripts()

  // uncomment if you want to prohibit inline CSS.  Allowed by default policy.
  // BrowserPolicy.content.disallowInlineStyles()

  // uncomment if you want your app to be able to be loaded in an iframe on any webpage.
  // BrowserPolicy.framing.allowAll()
});
