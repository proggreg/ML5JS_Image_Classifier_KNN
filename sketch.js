let video;
let featureExtractor;
let knn;

let trainButton;
let classifyButton;

let textInput;

let output;
let trainingMessage;
let message;

let videoWidth = 320;
let videoHeight = 240;
let canvas;


function modelReady() {
 console.log('model ready');
}

function setup() {
  canvas = createCanvas(videoWidth * 2, videoHeight);
  background(0);
  let canvasPosX = windowWidth / 2 - videoWidth;
  let canvasPosY = windowHeight / 2 - videoHeight / 2 + 100;
  canvas.position(canvasPosX,canvasPosY);
  canvas.parent('container');
  canvas.attribute('float','center');

  video = createCapture(VIDEO);
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  knn = ml5.KNNClassifier();
  video.size(videoWidth, videoHeight);
  video.hide();

  textInput = createInput("Add Label");
  textInput.attribute('size',40);
  textInput.attribute('height', 60);
  textInput.position(canvasPosX,canvasPosY - 60)

  // buttons
  textSize(28);
  trainButton = createButton('Train Image');
  trainButton.size(videoWidth,40);
  trainButton.style('font-size', '16px');
  trainButton.position(canvasPosX,canvasPosY + videoHeight);
  trainButton.mousePressed(trainImg);

  classifyButton = createButton('Classify');
  classifyButton.size(videoWidth,40);
  classifyButton.style('font-size', '16px');
  classifyButton.position(canvasPosX + videoWidth ,canvasPosY + videoHeight)
  classifyButton.mousePressed(startClassify);

  //messages
  output = createP('There is a ');
  output.style('font-size', '32px');
  output.position(canvasPosX + videoWidth,canvasPosY - 80);

  trainingMessage = createP('No Images have been trained yet');
  trainingMessage.position(canvasPosX, canvasPosY - 40);

  message = createP('What are you training?');
  message.position(canvasPosX,canvasPosY - 100);

}

function startClassify() {
  let features = featureExtractor.infer(video);
  knn.classify(features, gotResult);
}

function gotResult(err, results) {

  if (err) {
    console.log(err);
  }
  output.html('There is a '+ results.label);
  let features = featureExtractor.infer(video);
  knn.classify(features, gotResult);
}

function trainImg() {
  let features = featureExtractor.infer(video);
  knn.addExample(features, textInput.value());
  trainingMessage.html('Training ' + textInput.value() + ' Images')
  copy(width / 2,0,videoWidth,videoHeight,0,0,videoWidth,videoHeight);
}

function draw() {
  image(video, width / 2, 0);
}
