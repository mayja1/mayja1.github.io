function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      getUserPhotos();
      
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  } 
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1746627245559400',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
  });

};

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  function getUserPhotos() {
    console.log("getting user photos");
    FB.api('/me/albums?fields=id,name,link', 
      function(response) {
        for (var i=0; i<response.data.length; i++) {
          var album = response.data[i];
          if (album.name == 'Profile Pictures'){
            console.log("Found profile pictures album")
            FB.api('/'+album.id+'/photos?fields=id,name,picture', function(photos){
              if (photos && photos.data && photos.data.length){
                for (var j=0; j<photos.data.length; j++){
                  var photo = photos.data[j];
                  console.log(photo);
                  var image = document.createElement('img');
                  image.src = photo.picture;
                  document.body.appendChild(image);
            // photo.picture contain the link to picture
            
          }
        }
      });
            console.log("finished appending pictures");
            break;
          }
        }
      });
}

function getFacebookPhoto(id) {
 FB.api(
  "/" + id,
  function (response) {
    if (response && !response.error) {
      /* handle the result */
    }
  }
  );
}