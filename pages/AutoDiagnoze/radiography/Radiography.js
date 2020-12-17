let radiographyCanvas = document.getElementById('radiographyCanvas');
let context = radiographyCanvas.getContext('2d')

var startXRayScan;
var scanXrayCanvas;
var contextWebCam;
var video;

function init() {
    startXRayScan = document.querySelector('.start-live-xray')
    video = document.getElementById('SourceVideo')
    scanXrayCanvas = document.getElementById('webcam-canvas')
    contextWebCam = scanXrayCanvas.getContext('2d')

  if (video.readyState >= 3) {
    readyToPlay();
  } else {
    video.addEventListener('canplay', readyToPlay);
  }
  
  startXRayScan.addEventListener('click', function () {
    startCamera();
  });
}

function readyToPlay() {
  scanXrayCanvas.width = video.videoWidth;
  scanXrayCanvas.height = video.videoHeight;
  video.play();
  drawFrame(video);
}

function initCamera(stream) {
  video.srcObject = stream;
}

function startCamera() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(initCamera)
      .catch(console.error);
  }
}

function drawFrame(video) {
  contextWebCam.drawImage(video, 0, 0);
  var imageData = contextWebCam.getImageData(0, 0, scanXrayCanvas.width, scanXrayCanvas.height);
  invertColors(imageData.data);
  contextWebCam.putImageData(imageData, 0, 0);
  setTimeout(function () {
    drawFrame(video);
  }, 10);
}

function invertColors(data) {
  for (var i = 0; i < data.length; i+= 4) {
    data[i] = data[i] ^ 255;
    data[i+1] = data[i+1] ^ 255;
    data[i+2] = data[i+2] ^ 255;
  }
}

window.addEventListener('load', init);