const image = document.getElementById("Source");
const canvas = document.getElementById("Canvas");
const rOffsetInput = document.getElementById("rOffset");
const gOffsetInput = document.getElementById("gOffset");
const bOffsetInput = document.getElementById("bOffset");
if (image.complete) init();
image.addEventListener("load", init);

function init() {
    const ctx = canvas.getContext("2d");
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    console.log(imageData);

    rOffsetInput.addEventListener("change", updateCanvas);
    gOffsetInput.addEventListener("change", updateCanvas);
    bOffsetInput.addEventListener("change", updateCanvas);
    
    function updateCanvas() {
      const updatedImageData = rgbSplit(imageData, {
        rOffset: Number(rOffsetInput.value), 
        gOffset: Number(gOffsetInput.value),
        bOffset: Number(bOffsetInput.value)
      });
      ctx.putImageData(updatedImageData, 0, 0);
    }
  }

function rgbSplit(imageData, options) {
    const { rOffset = 0, gOffset = 0, bOffset = 0 } = options; 
    const originalArray = imageData.data;
    const newArray = new Uint8ClampedArray(originalArray);
    for (let i = 0; i < originalArray.length; i += 4) {
      newArray[i + 0 + rOffset * 4] = originalArray[i + 0]; // 🔴
      newArray[i + 1 + gOffset * 4] = originalArray[i + 1]; // 🟢
      newArray[i + 2 + bOffset * 4] = originalArray[i + 2]; // 🔵
    }
    return new ImageData(newArray, imageData.width, imageData.height);
  }


