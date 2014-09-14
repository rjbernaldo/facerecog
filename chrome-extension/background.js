chrome.browserAction.onClicked.addListener(function(tab) {
  header.innerHTML = "Login to " + tab.title;
  tab.executeScript({
    code: "document.getElementsByTagName('html')[0].innerHTML; console.log(1)"
  }, function(body) {
    console.log(body);
  });
});
