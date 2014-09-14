$(document).ready(function() {
  if (location.pathname === "/"){
    var pic_data
    var streaming = false,
    video        = document.querySelector('#video'),
    canvas       = document.querySelector('#canvas'),
    photo        = document.querySelector('#photo'),
    startbutton  = document.querySelector('#startbutton'),
    width = 300,
    height = 300;

    navigator.getMedia = ( navigator.getUserMedia ||
     navigator.webkitGetUserMedia ||
     navigator.mozGetUserMedia ||
     navigator.msGetUserMedia);

    navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      window.s = stream;
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }

    }, false);

    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      pic_data = canvas.toDataURL('image/png');
      pic_data = pic_data.slice(22)
      photo.setAttribute('src', pic);
    }

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);

    $('#login_button').on('click', function(e){
      console.log(pic_data)
      e.preventDefault();
      request = $.ajax({
        url: 'authenticate/auth_picture',
        type: 'POST',
        data: { pic_url: pic_data }
      })

      request.success(function(data){
        window.location.href = '/users/'+data
      })
      request.fail(function(data){
        alert("Bad Image! Press OK to try again")
        location.reload()
      })
    })
  }
})();