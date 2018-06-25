const resolution = 20;
var grid;
var trainingData;
var outputData;
var neuralNetwork;

function setup() {
	createCanvas(600, 600);
  	grid = new Grid(resolution);
  	grid.initialize();
  	trainingData = tf.tensor2d([0, 0, 0, 1, 1, 0, 1, 1], [4, 2], 'float32');
  	outputData = tf.tensor2d([0, 1, 1, 0], [4,1], 'float32');
	neuralNetwork = new neuralNet(trainingData, outputData);
}

function draw() {
	background(255);
	tf.tidy(() => {
		neuralNetwork.train();
		grid.fillGridWithPredicted(neuralNetwork);
		grid.show();
	});
}