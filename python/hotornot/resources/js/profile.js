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
    statusChangeCallback(response);
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
        if(!response.data) {
          console.log("error getting photos");
          return;
        }
        for (var i=0; i<response.data.length; i++) {
          var album = response.data[i];
          if (album.name == 'Profile Pictures'){
            console.log("Found profile pictures album")
            FB.api('/'+album.id+'/photos?fields=id,name,picture,height,width', function(photos){
              if (photos && photos.data && photos.data.length){
                for (var j=0; j<photos.data.length; j++){
                  var photo = photos.data[j];
                  var div = document.createElement('div');
                  div.className = "profilePicture";

                  var checkbox = document.createElement('input');
                  checkbox.type = "checkbox";
                  checkbox.name = "images[]";
                  checkbox.id = "value" + j;
                  checkbox.value = photo.picture;
                  checkbox.addEventListener('click', function () {
                    var checkgroup=document.getElementsByName("images[]");
                    var limit=3;
                    var checkedcount=0;
                    for (var i=0; i<checkgroup.length; i++) {
                      if(checkgroup[i].checked) {
                        checkedcount++;
                      }
                    }
                    if (checkedcount>limit){
                      alert("You can only select a maximum of "+limit+" checkboxes")
                      this.checked=false
                    }
                });
                  var image = document.createElement('img');

                  image.src = photo.picture;
                  if(photo.height > photo.width) {
                    image.style.height = '100%';
                    image.style.width = 'auto';
                  } else {
                    image.style.height = 'auto';
                    image.style.width = '100%';
                  }
                  var label = document.createElement('label');
                  label.htmlFor = checkbox.id;

                  label.style.width = '100%';
                  label.style.height = '100%';
                  label.appendChild(image);
                  
                  var linebreak = document.createElement('br');
                  var container = document.getElementById("picContainer");
                  div.appendChild(checkbox);
                  div.appendChild(label);
                  if(j % 3 == 2) {
                    div.appendChild(linebreak);
                  }
                  container.appendChild(div);
                  
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

function checkboxlimit(){
  console.log("checking limit");
  var checkgroup=document.getElementsByTagName("images");
  var limit=3;
  for (var i=0; i<checkgroup.length; i++){
    checkgroup[i].onclick=function(){
      var checkedcount=0
      for (var i=0; i<checkgroup.length; i++)
        checkedcount+=(checkgroup[i].checked)? 1 : 0
      if (checkedcount>limit){
        alert("You can only select a maximum of "+limit+" checkboxes")
        this.checked=false
      }
    }
  }
}