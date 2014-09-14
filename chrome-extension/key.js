window.onload = function () {
  var streaming    = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      startbutton  = document.querySelector('#startbutton'),
      formData     = document.querySelector('#form-data'),
      width        = 250,
      height       = 187.5,
      title        = "";

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  chrome.tabs.getSelected(null, function(tab) {
    console.log(tab.url)
    if (tab.url == "https://www.facebook.com/" || tab.url == "http://www.facebook.com/" || tab.url == "https://facebook.com/" || tab.url == "http://facebook.com/" ) {
      startbutton.style.background = 'red';
      title = "Facebook";
    } else if (tab.url == "https://www.twitter.com/" || tab.url == "http://www.twitter.com/" || tab.url == "https://twitter.com/" || tab.url == "http://twitter.com/"){
      startbutton.style.background = 'red';
      title = "Twitter";
    } else {
      startbutton.style.background = 'black';
    }
  });

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

  function signIn(account, username, password) {
    chrome.tabs.getSelected(null, function(tab) {
      if (account == "Twitter") {
        var fillUserName = "document.querySelectorAll('#signin-email')[0].value = '" + username + "'";
        var fillPassword = "document.querySelectorAll('#signin-password')[0].value = '" + password + "'";
        var clickButton = "document.querySelectorAll('.submit.btn.primary-btn')[0].click()";

        chrome.tabs.executeScript({
          code: fillUserName
        });
        chrome.tabs.executeScript({
          code: fillPassword
        });
        chrome.tabs.executeScript({
          code: clickButton
        });

        startbutton.style.background = 'green';
        startbutton.innerHTML = 'verified'

        setTimeout(function() {
          window.close();
        }, 1000);

      } else if (account == "Facebook") {
        var fillUserName = "document.querySelectorAll('#email')[0].value = '" + username + "'";
        var fillPassword = "document.querySelectorAll('#pass')[0].value = '" + password + "'";
        var clickButton = "document.querySelector('#loginbutton').children[0].click()";

        chrome.tabs.executeScript({
          code: fillUserName
        });
        chrome.tabs.executeScript({
          code: fillPassword
        });
        chrome.tabs.executeScript({
          code: clickButton
        });

        startbutton.style.background = 'green';
        startbutton.innerHTML = 'verified'

        setTimeout(function() {
          window.close();
        }, 1000);
      }



    });
  }

  startbutton.addEventListener('click', function(e){
    e.preventDefault();

    startbutton.innerHTML = "verifying...";

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

        chrome.tabs.getSelected(null, function(tab) {
          var username, password;
          if (title == "Twitter" && data == "RJ") {
            signIn(title, 'rjbernaldo', '1234567890');

          } else if (title == "Twitter" && data == "Kendall") {
            signIn(title, 'KendallScane', 'rjknowsmypassword');

          } else if (title == "Facebook" && data == "RJ") {
            signIn(title, 'rjthreee@yahoo.com', '1234567890');

          } else if (title == "Facebook" && data == "Kendall") {
            signIn(title, 'kendall.carey@gmail.com', 'rjknowsmypassword');

          } else if (title == "") {
            startbutton.style.background = 'red';
            startbutton.innerHTML = 'Domain not in database.';

          } else if (data == "Unrecognized") {
            startbutton.style.background = 'red';
            startbutton.innerHTML = 'User not found. Verify again.';
          }
        });

      }
    }

    xhr.send(formData);
  }, false);

};
