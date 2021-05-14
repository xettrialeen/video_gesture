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
    console.log(prediction);
    // model.renderPredictions(prediction, canvas, context, video);
    // console.log(prediction[1].bbox[0] / 10);

    // if (prediction.length <= 0) {
    //   myRange.value = 0;
    // } else {
    // console.log(prediction[1].bbox[0] / 5);
    myRange.value = prediction[1].bbox[0] / 5;
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});
