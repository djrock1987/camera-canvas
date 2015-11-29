var canvas        = document.getElementById('canvas'),
    ctx           = canvas.getContext('2d'),
    video         = document.getElementById('video'),
    vendorUrl     = window.URL || window.webkitURL,
    w             = canvas.width,
    h             = canvas.height,
    red           = document.querySelector('.red'),
    blue          = document.querySelector('.blue'),
    green         = document.querySelector('.green'),
    alpha         = document.querySelector('.alpha'),
    download      = document.querySelector('.download');

(function() {

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
    window.alert("Pour appliquer des effets vidéo, le mieux c'est d'autoriser le site à afficher ta webcam...");
  });

})(); // Auto Start Function Wecam Require


  /**
  * DRAW CANVAS
  */

  var vert = 0.5,
      bleu = 0.5,
      rouge = 0.5,
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

/**
* DRAW FUNCTION
**/

  function draw(video, ctx, width, height) {

    ctx.drawImage(video,0,0,w,h);
    var image = ctx.getImageData(0,0,w,h);
    var data = image.data;

    for(i = 0; i < data.length; i += 4) {
      var red   = data[i],
          green = data[i + 1],
          blue  = data[i + 2],
          alpho = data[i + 3],
          gray = (red+green+blue)/3;

      // Multiplier la valeur de la couleur entre 0 et 1

      // data[i]           = rouge * red;
      // data[i + 1]       = vert * green;
      // data[i + 2]       = bleu * blue;
      // data[i + 3]       = alpho * alpha;

      data[i]           = gray;
      data[i + 1]       = gray;
      data[i + 2]       = gray;

    }

    image.data = data;
    ctx.putImageData(image,0,0);

    setTimeout(draw,10);
  }

  /**
  * CAPTURE AND DOWNLOAD
  **/

  download.addEventListener('click',function(){
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    window.open("dataURL","_self");
  });
