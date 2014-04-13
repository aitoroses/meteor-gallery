Router.map(function(){
  this.route('home', {
    path: "/",
    action: function(){
      Famous.main(Scenes.home);
    }
  });
  this.route('test', {
    path: "/test",
    action: function(){
      Famous.main(Scenes.test);
    }
  })
});