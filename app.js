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
    flip = document.querySelector('.flip');

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
  * DRAW CANVAS
  */


  var vert  = 1,
      bleu  = 1,
      rouge = 1,
      alpho = 1;

  video.addEventListener('play', function() {
    draw(this,ctx,400,300);
  }, false);

  green.addEventListener('input',function(){
    vert = green.value;
    console.log("Niveau de vert : " + vert);
  });

  blue.addEventListener('input',function(){
    bleu = blue.value;
    console.log("Niveau de bleu : " + bleu);
  });

  red.addEventListener('input',function(){
    rouge = red.value;
    console.log("Niveau de rouge : " + rouge);
  });

  alpha.addEventListener('input', function(){
    alpho = alpha.value;
    console.log("Niveau d'alpha : " + alpho);
  });

  function draw(video, ctx, width, height) {

    ctx.drawImage(video,0,0,width,height);

    var image, data, i, r, g, b, brightness;

    image = ctx.getImageData(0,0,width,height);
    data = image.data;

    for(i = 0; i < data.length; i += 4) {
            var red = data[i]; // 0 to 255
            var green = data[i + 1]; // 0 to 255
            var blue = data[i + 2]; // 0 to 255
            // var alpha = data[i + 3]; // 0 to 255
            var gray = (red+green+blue)/3;

            //RVB VARIATION

            // data[i]           = rouge * red; // you can multiply the color and alpha values with a number between 0 and 1
            // data[i + 1]       = vert * green;
            // data[i + 2]       = bleu * blue;

            // N&B

            // data[i]           = gray; // you can multiply the color and alpha values with a number between 0 and 1
            // data[i + 1]       = gray;
            // data[i + 2]       = gray;

            // TV LOW QUALITY EFFECT

            // data[i]           = Math.random() * red; // you can multiply the color and alpha values with a number between 0 and 1
            // data[i + 1]       = Math.random() * green;
            // data[i + 2]       = Math.random() * blue;

            // NEGATIVE EFFECT

            // data[i]   = 255 - data[i];   // red
            // data[i+1] = 255 - data[i+1]; // green
            // data[i+2] = 255 - data[i+2]; // blue

            // SEPIA EFFECT

            // data[i]           = (red * 0.393) + (green * 0.769) + (blue * 0.189);
            // data[i + 1]       = (red * 0.349) + (green * 0.686) + (blue * 0.168);
            // data[i + 2]       = (red * 0.272) + (green * 0.534) + (blue * 0.131);

            // LINE

            data[i] = 1*data[i] - 2*data[i + 2] + 2*data[i + (canvas.width*3.90)];



    }

    ctx.putImageData(image,0,0);
    setTimeout(draw,10,video,ctx, width, height);
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
