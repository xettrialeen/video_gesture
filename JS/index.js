// // import Plyr from "plyr";
// const player = new Plyr("#player", {});
// player.volume; // 0.5;
// player.currentTime; // 10
// player.fullscreen.active; // false;
const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size .
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

//   select everything on html
const video = document.querySelector("#video");
video.style.width = "400px";
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
let model;
let myRange = document.querySelector("#myRange");
// video
let videoYt = document.querySelector("#video1");

// c starting handtracking
handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      {
        video: {},
      },
      (stream) => {
        video.srcObject = stream;
        setInterval(runDetection, 0);
      },
      (err) => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then((prediction) => {
    let xValue = prediction[1].bbox[0] / 5;
    let yValue = prediction[1].bbox[1] / 3;
    let skip = 1;
    let volume = (1 / 100) * 3;
    // console.log(prediction);
    console.log(xValue);
    console.log(yValue);

    function skipping() {
      if (xValue >= 50 && yValue >= 50) {
        videoYt.currentTime += skip++;
      } else {
        if (xValue >= 50) {
          videoYt.currentTime -= skip--;
        }
      }
    }
    skipping();
    if (xValue <= 50 && yValue <= 50) {
      videoYt.volume += volume++;
    } else {
      if (xValue <= 50) {
        videoYt.volume -= volume--;
      }
    }

    // videoYt.currentTime = prediction[1].bbox[0];
    // videoYt.currentTime = prediction[1].bbox[0] / 2.5;

    // myRange.value = prediction[1].bbox[0] / 5;
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});
