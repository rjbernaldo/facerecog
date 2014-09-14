window.onload = function () {

  navigator.webkitGetUserMedia({ audio: false, video: true }, function() {
    console.log('ok');
  }, function(err) {
    console.log(err);
  });

};

function User() {
  this.name = "";
  this.uniqueName = "";
  this.email = "";
  this.image = "";
}
