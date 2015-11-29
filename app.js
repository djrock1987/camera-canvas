(function() {

  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL,
    red = document.querySelector('.red'),
    blue = document.querySelector('.blue'),
    green = document.querySelector('.green'),
    alpha = document.querySelector('.alpha'),
    download = document.querySelector('.download'),
    rotate = document.querySelector('.rotate'),
    flip = document.querySelector('.flip'),
    inverserbtn = document.querySelector('.inverse');

  /**
   * WEBCAM AUTORISATION
   */

  navigator.getMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.getMedia({
    video: true,
    audio: false
  }, function(stream) {
    video.src = vendorUrl.createObjectURL(stream);
    video.play();
  }, function(error) {
    window.alert("Pour appliquer des effets vidéo, le mieux c'est d'autorisé le site à afficher ta webcam...");
  });

  /**
  * DRAW VIDEO
  **/

  video.addEventListener('play', function() {
    draw(this,ctx,400,300);
  }, false);

  /**
  * DRAW FUNCTION
  **/

  function draw(video, ctx, width, height) {

    ctx.drawImage(video,0,0,width,height);

    var image, data, i, r, g, b, brightness;

    image = ctx.getImageData(0,0,width,height);
    data = image.data;

    // EFFECT

    data[i]   = red;
    data[i+1] = green;
    data[i+2] = blue;
    data[i+3] = alpha;

    // RGB VARIATION
    var variation = function() {
      for (i = 0; i < data.length; i += 4) {

        red     = rouge * red;
        green   = vert * green;
        blue    = bleu * blue;

      }
      ctx.putImageData(image, 0, 0);
    };

    // BLACK & WHITE
    var blackNwhite = function() {
      for (i = 0; i < data.length; i += 4) {

        var grayscale = (red + green + blue)/3; // Create the Grayscale Color

        red     = grayscale;
        green   = grayscale;
        blue    = grayscale;

      }
      ctx.putImageData(image, 0, 0);
    };

    // BAD TV
    var badtv = function() {
      for (i = 0; i < data.length; i += 4) {

        red     = Math.random() * red;
        green   = Math.random() * green;
        blue    = Math.random() * blue;

      }
      ctx.putImageData(image, 0, 0);
    };

    // INVERSE (NEGATIVE EFFECT)
    var inverse = function() {
      for (i = 0; i < data.length; i += 4) {

        data[i]       = 255 - data[i];          // red
        data[i + 1]   = 255 - data[i + 1];      // green
        data[i + 2]   = 255 - data[i + 2];       // blue

      }
      ctx.putImageData(image, 0, 0);
    };

    // SEPIA EFFECT
    var sepia = function() {
      for (i = 0; i < data.length; i += 4) {

        red     = (red * 0.393) + (green * 0.769) + (blue * 0.189);
        green   = (red * 0.349) + (green * 0.686) + (blue * 0.168);
        blue    = (red * 0.272) + (green * 0.534) + (blue * 0.131);

      }
      ctx.putImageData(image, 0, 0);
    };

    // FAKE 3D EFFECT
    var fakeeffect = function() {
      for (i = 0; i < data.length; i += 4) {

        red     = red - 2*green + 2*data[i + (canvas.width*3.90)];

      }
      ctx.putImageData(image, 0, 0);
    };


    setTimeout(draw,10,video,ctx, width, height);
    inverserbtn.addEventListener('click', inverse);

  }

  rotate.addEventListener('click',function(){
    ctx.scale(1,-1); //flip vertically
    ctx.translate(0,-300); //move beneath original position
  });

  flip.addEventListener('click',function(){
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  });

  download.addEventListener('click',function(){
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
  });

})();
