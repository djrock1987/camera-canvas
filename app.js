(function() {

  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL,
    red = document.querySelector('.red'),
    blue = document.querySelector('.blue'),
    green = document.querySelector('.green'),
    download = document.querySelector('.download');

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

  var vert = 2,
      bleu = 2,
      rouge = 2;

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

  function draw(video, ctx, width, height) {

    ctx.drawImage(video,0,0,width,height);

    var image, data, i, r, g, b, brightness;

    image = ctx.getImageData(0,0,width,height);
    data = image.data;

    for(i = 0; i < data.length; i += 4) {
            var red = data[i]; // 0 to 255
            var green = data[i + 1]; // 0 to 255
            var blue = data[i + 2]; // 0 to 255
            var alpha = data[i + 3]; // 0 to 255

            data[i]           = rouge * red; // you can multiply the color and alpha values with a number between 0 and 1
            data[i + 1]       = vert * green;
            data[i + 2]       = bleu * blue;
            data[i + 3]       = 1 * alpha;

    }

    ctx.putImageData(image,0,0);
    setTimeout(draw,10,video,ctx, width, height);
  }

  download.addEventListener('click',function(){
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
  })


})();
