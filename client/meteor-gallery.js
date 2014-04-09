/*var Images = new Meteor.Collection("Image");



if (Meteor.isClient) {

  Session.set("scrollX", 0);
  Session.set("scrollY", 0);

  var imageSize = 100;

  Template.gallery.images = function () {
    images = Images.find().fetch();
    rows = Math.sqrt(images.length);
    for (var i = images.length - 1; i >= 0; i--) {
      images[i].x = imageSize * Math.floor((i / rows));
      images[i].y = imageSize * Math.floor((i % rows));
    };
    return images;
  };

  Template.gallery.rendered = function(){

      acceleration = 2;
      deceleration = 0.9;
      var velocityX = 0;
      var velocityY = 0;

      function loop() {

        velocityX *= deceleration;
        velocityY *= deceleration;

        var scrollX, scrollY;
        scrollX = Session.get('scrollX');
        scrollY = Session.get('scrollY');
        Session.set('scrollX', scrollX + velocityX);
        Session.set('scrollY', scrollY + velocityY);

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);

      // Setup the input event
      var hammer = $(".container").hammer();
      hammer.on("drag", function(e) {

          var g = e.gesture;
          if (g.direction == "up") {
            velocityY -= g.velocityY * acceleration;
          }
          else if (g.direction == "right") {
            velocityX += g.velocityX * acceleration;
          }
          else if (g.direction == "down"){
            velocityY += g.velocityY * acceleration;
          }
          else if (g.direction == "left"){
            velocityX -= g.velocityX * acceleration;
          }
      });
  };

  Template.container.scrollX = function() {
    return Session.get("scrollX");
  }

  Template.container.scrollY = function() {
    return Session.get("scrollY");
  }

  Template.image.events({
    "click": function(e, tmpl) {
      $(".image").removeClass("active")
      tmpl.$("> div").addClass("active");
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Fill the DB
    Images.remove({});
    for (var i = 399; i >= 0; i--) {
      Images.insert({
        title: i,
      });
    };
  });
}
*/
