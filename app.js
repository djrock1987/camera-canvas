(function() {

  /**
  * ALL VARIABLES
  **/

  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL,

    redrange = document.querySelector('.red'),
    bluerange = document.querySelector('.blue'),
    greenrange = document.querySelector('.green'),

    download = document.querySelector('.download'),
    rotate = document.querySelector('.rotate'),
    flip = document.querySelector('.flip'),

    coucou = querySelector;


    effect = 'no',

    blackNwhitebtn = document.querySelector('.blackNwhite'),
    inversebtn = document.querySelector('.inverse'),
    variationbtn = document.querySelector('.variation'),
    badtvbtn = document.querySelector('.tveffect'),
    sepiabtn = document.querySelector('.sepia'),
    dimensionbtn = document.querySelector('.dimension'),
    resetbtn = document.querySelector('.reset'),

    controls = document.querySelector('.range');

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
    draw(this, ctx, 400, 300);
  }, false);

  /**
   * DRAW FUNCTION
   **/

  // ONLY FOR VARIATION MODE RVB

   var red     = 1,
       green   = 1,
       blue    = 1;

  // RED
   redrange.addEventListener('input',function(){
     red = redrange.value;
   });

   // GREEN
   greenrange.addEventListener('input',function(){
     green = greenrange.value;
   });

   // BLUE
   bluerange.addEventListener('input',function(){
     blue = bluerange.value;
   });

  function draw(video, ctx, width, height) {

    ctx.drawImage(video, 0, 0, width, height);

    var image = ctx.getImageData(0, 0, width, height);
    var data = image.data;

    // VARIATION EFFECT
    if(effect == 'variation') {

      for (i = 0; i < data.length; i += 4) {

        data[i] = red * data[i];
        data[i + 1] = green * data[i + 1];
        data[i + 2] = blue * data[i + 2];

      }
      ctx.putImageData(image, 0, 0);

      // RESET
    } else if (effect == 'reset') {

        for (i = 0; i < data.length; i += 4) {

          data[i] = data[i];
          data[i + 1] = data[i + 1];
          data[i + 2] = data[i + 2];

        }
        ctx.putImageData(image, 0, 0);

      // B&W EFFECT
    } else if (effect == 'blackNwhite') {

        for (i = 0; i < data.length; i += 4) {

          var grayscale = ( data[i] + data[i + 1] + data[i + 2] ) / 3; // Create the Grayscale Color

          data[i] = grayscale;
          data[i + 1] = grayscale;
          data[i + 2] = grayscale;

        }
        ctx.putImageData(image, 0, 0);

      // INVERSE EFFECT
    } else if (effect == 'inverse') {

        for (i = 0; i < data.length; i += 4) {

          data[i] = 255 - data[i]; // red
          data[i + 1] = 255 - data[i + 1]; // green
          data[i + 2] = 255 - data[i + 2]; // blue

        }
        ctx.putImageData(image, 0, 0);

      // BAD TV EFFECT
    } else if (effect == 'badTv') {

        for (i = 0; i < data.length; i += 4) {

          data[i] = Math.random() * data[i];
          data[i + 1] = Math.random() * data[i + 1];
          data[i + 2] = Math.random() * data[i + 2];

        }
        ctx.putImageData(image, 0, 0);

      // SEPIA EFFECT
    } else if (effect == 'sepia') {

      for (i = 0; i < data.length; i += 4) {

        data[i] = (data[i] * 0.393) + (data[i + 1] * 0.769) + (data[i + 2] * 0.189);
        data[i + 1] = (data[i] * 0.349) + (data[i + 1] * 0.686) + (data[i + 2] * 0.168);
        data[i + 2] = (data[i] * 0.272) + (data[i + 1] * 0.534) + (data[i + 2] * 0.131);

      }
      ctx.putImageData(image, 0, 0);

      // FAKE 3D EFFECT
    } else if (effect == '3D') {

      for (i = 0; i < data.length; i += 4) {

        data[i] = data[i] - 2 * data[i + 1] + 2 * data[i + (canvas.width * 3.90)];

      }
      ctx.putImageData(image, 0, 0);

    }

    // REFRESH 10 MS - WE CAN USE REQUEST ANIMATION FRAME TOO
    setTimeout(draw, 10, video, ctx, width, height);

  }


  // BUTTON

  variationbtn.addEventListener('click', function(){
    effect = 'variation';
    controls.style.display = 'block';
  });

  blackNwhitebtn.addEventListener('click', function(){
    effect = 'blackNwhite';
    controls.style.display = 'none';
  });

  inversebtn.addEventListener('click', function(){
    effect = 'inverse';
    controls.style.display = 'none';
  });

  badtvbtn.addEventListener('click', function(){
    effect = 'badTv';
    controls.style.display = 'none';
  });

  sepiabtn.addEventListener('click', function(){
    effect = 'sepia';
    controls.style.display = 'none';
  });

  dimensionbtn.addEventListener('click', function(){
    effect = '3D';
    controls.style.display = 'none';
  });

  resetbtn.addEventListener('click', function(){
    effect = 'reset';
    controls.style.display = 'none';
  });


  rotate.addEventListener('click', function() {
    ctx.scale(1, -1); //flip vertically
    ctx.translate(0, -300); //move beneath original position
  });

  flip.addEventListener('click', function() {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  });

  download.addEventListener('click', function() {
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
  });

})(); // FUNCTION GLOBAL START
