function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      FB.api('/me?fields=email', function(emailResponse) {
        getUserPhotos(emailResponse.email);
        getUserRatings(emailResponse.email);
      });
      
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


  function getUserPhotos(email) {
    //todo, get user photos from database
    console.log(email);
    $.ajax({
      type:"post",
      url:"getProfile",
      data:{
        email: email,
      },
      success:function(msg){
        console.log(msg);
        var dict = JSON.parse(msg);
        var list = [dict["pic1"], dict["pic2"], dict["pic3"]];

        console.log(list);
        for(var i = 0; i < list.length; i = i+1){
          var photo = list[i];
          console.log(photo);
          var image = document.createElement('img');

          image.src = photo;
          if(photo.height > photo.width) {
           image.style.height = '100%';
           image.style.width = 'auto';
         } else {
          image.style.height = 'auto';
          image.style.width = '100%';
        }
        var label = document.createElement('label');

        label.style.width = '100%';
        label.style.height = '100%';
        label.appendChild(image);

        var linebreak = document.createElement('br');
        var container = document.getElementById("picContainer");

        var div = document.createElement('div');
        div.className = "profilePicture";
        div.appendChild(label);
        div.appendChild(linebreak);
        container.appendChild(div);
      }
      
    }
  })
    
  }

function getUserRatings(email) {
    //todo, get user photos from database
    console.log(email);
    $.ajax({
      type:"post",
      url:"getRatings",
      data:{
        email: email,
      },
      success:function(msg){
        console.log(msg);
        var dict = JSON.parse(msg);
        var colors = ["#0000FF", "#3300FF", "#6600FF", "#9900FF", "#CC00FF", "#FF00CC", "#FF0099", "#FF0066", "#FF0033" ,"#FF0000"];
        var list = [];
        var totalNumberOfRatings = 0;
        var totalRating = 0;
        var max = 0;
        for(var i = 0; i <= 9; i= i+1){
          var numRatings = dict["" + (i+1)];
          list.push(numRatings);
          totalNumberOfRatings += numRatings;
          totalRating = numRatings * (i+1);
          if(numRatings > max) {
            max = numRatings;
          }
        }

        for(var i = 9; i >= 0; i = i-1){
          var numRatings = list[i];
          console.log("" + (i+1) + ": " + numRatings);
          var bar = document.createElement('li');
          bar.style.width = "" + ((numRatings/max)*100) + "%";
          bar.style.background = colors[i];
          bar.innerHTML = "" + (i+1);
          var container = document.getElementById("bargraph");
          container.appendChild(bar);
      }
      var text = document.getElementById("hotness");
      text.innerHTML = text.innerHTML + (totalRating/totalNumberOfRatings);
      
    }
  })
    
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