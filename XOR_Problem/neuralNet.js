function neuralNet(trainingData, outputData) {
    this.trainingData = trainingData;
    this.outputData = outputData;
  
  	this.model = tf.sequential();
  
  	//1st hidden layer
  	this.model.add(tf.layers.dense({
    	inputShape : [2],
      	activation : 'sigmoid',
      	units : 4,
    }));
  
  	//2nd hidden layer
  	this.model.add(tf.layers.dense({
    	inputShape : [4],
      	activation : 'sigmoid',
      	units : 1,
    }));
  
  	this.model.compile({
     	loss : 'meanSquaredError',
      	optimizer : tf.train.sgd(0.05),
    });
  
  	this.train = function() {
		this.model.fit(this.trainingData, this.outputData, {
			epochs : 100,
			batchSize : 30,
			shuffle : true,
		});
    }
    
    this.predictXY = function(x, y) {
		var result = this.model.predict(tf.tensor2d([x, y], [1, 2]));
		return result.dataSync()[0];
    }
}