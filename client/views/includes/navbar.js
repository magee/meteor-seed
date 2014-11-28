// Changes scroll bar from static to fixed when menu reaches the top
$(document).scroll(function(e){
  var scrollTop = $(document).scrollTop();
  var headerHeight = $('header').height();
  console.log("headerHeight:  ", headerHeight);
  if(scrollTop > 100){
    console.log(scrollTop);
    $('.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');
    $('body').css("padding-top", headerHeight + "px");
  } else {
    $('.navbar').removeClass('navbar-fixed-top').addClass('navbar-static-top');
    $('body').css("padding-top", "0px");
  }
});


Template.navbar.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.name === name
    });

    return active && 'active';
  }
});
