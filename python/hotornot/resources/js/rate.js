window.onload = function() {
  getUserPhotos();
};


function getUserPhotos() {
    //todo, get user photos from database
    $.ajax({
      type:"post",
      url:"getRandomUser",
      data:{
      },
      success:function(msg){
        console.log(msg);
        var dict = JSON.parse(msg);
        var list = [dict["Picture1"], dict["Picture2"], dict["Picture3"]];

        console.log(list);
        for(var i = 0; i < list.length; i = i+1){
          var photo = list[i];
          console.log(photo);
          var image = document.createElement('img');

          image.src = photo;
          image.style.height = '100%';
          image.style.width = '100%';
          /*if(photo.height > photo.width) {
           image.style.height = '100%';
           image.style.width = 'auto';
         } else {
          image.style.height = 'auto';
          image.style.width = '100%';
        }*/
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