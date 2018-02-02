export function loadPic(url, cb) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var img = new Image();

    img.onload = function() { //the original image is loaded.
      var that = this, imgCompressed = new Image(),
        oCanvas = document.createElement("canvas"),
        oCtx = oCanvas.getContext("2d");

      oCanvas.width = that.width;
      oCanvas.height = that.height;

      oCtx.drawImage(img, 0, 0, oCanvas.width, oCanvas.height);

      imgCompressed.onload = cb;
      imgCompressed.src = oCanvas.toDataURL("image/jpeg"); //loading the compressed image.
    };

    img.src = e.target.result; //loading the original image.
  };

  reader.readAsDataURL(url);
}

export function convertRemToPixels(rem) {    
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
