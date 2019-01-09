let video;
let featureExtractor;
let knn;

let trainButton;
let classifyButton;

let label;

let output;
let trainingMessage;
let message;

let start = false;

let videoWidth = 320;
let videoHeight = 240;
let canvas;

function knnLoaded() {
  let features = featureExtractor.infer(video);
  knn.classify(features, gotResult);
}

function modelReady() {
 console.log('model ready');
}

function setup() {
  canvas = createCanvas(videoWidth * 2, videoHeight);
  background(0);
  let canvasPosX = windowWidth / 2 - videoWidth / 2;
  let canvasPosY = windowHeight / 2 - videoHeight / 2;
  canvas.position(0,canvasPosY);

  video = createCapture(VIDEO);
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  knn = ml5.KNNClassifier();
  video.size(videoWidth, videoHeight);
  video.hide();

  label = createInput();
  label.attribute('size',50);
  label.position(0,canvasPosY - 60)

  // buttons
  trainButton = createButton('Train Image');
  trainButton.size(videoWidth,40);
  classifyButton = createButton('Classify');
  classifyButton.size(videoWidth,40);
  trainButton.position(0,canvasPosY + videoHeight);
  classifyButton.position(width/2,canvasPosY + videoHeight)
  trainButton.mousePressed(trainImg);
  classifyButton.mousePressed(startClassify);

  //messages
  output = createP('There is a ');
  output.style('font-size', '32px');
  output.position(canvasPosX,canvasPosY - 80);
  trainingMessage = createP('No Images have been trained yet');
  trainingMessage.position(40 , canvasPosY - 40);
  message = createP('Type in what you would like to classify and train using the the button below');
  message.position(0,canvasPosY - 100);

}

function startClassify() {
  let features = featureExtractor.infer(video);
  knn.classify(features, gotResult);
}

function gotResult(err, results) {
  output.html('There is a '+ results.label);
  let features = featureExtractor.infer(video);
  knn.classify(features, gotResult);
}

function trainImg() {
  let features = featureExtractor.infer(video);
  knn.addExample(features, label.value());
  trainingMessage.html('Training ' + label.value() + ' Images')
  copy(width / 2,0,videoWidth,videoHeight,0,0,videoWidth,videoHeight);
}

// function trainImg2() {
//   let features = featureExtractor.infer(video);
//   knn.addExample(features, 'Image2');
//   messageImageTwo.html('Training Image Two example added')
//   copy(width / 2 - videoWidth / 2,0,videoWidth,videoHeight,width - videoWidth,0,videoWidth,videoHeight);
// }



function draw() {
  image(video, width / 2, 0);
}
