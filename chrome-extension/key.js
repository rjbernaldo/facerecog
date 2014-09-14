window.onload = function () {
  chrome.tabs.getSelected(null, function(tab) {
    console.log(tab.title);
  });
  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      startbutton  = document.querySelector('#startbutton'),
      formData     = document.querySelector('#form-data'),
      header     = document.querySelector('#header'),
      width = 500,
      height = 500;

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

  function dataURItoBlob(dataURI){
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
  }

  function takePicture() {
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg').slice(22);
  }

  startbutton.addEventListener('click', function(e){
    e.preventDefault();
    var img = takePicture();

    var formData = new FormData();
    formData.append('image', img);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/authenticate/auth_extension', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var data = "Unrecognized";
        if (JSON.parse(xhr.responseText).face[0] !== undefined) {
          data = JSON.parse(xhr.responseText).face[0].name;
        }

        header.innerHTML = data;
      }
    }
    xhr.send(formData);
  }, false);

};
