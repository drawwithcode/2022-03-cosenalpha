let foo;
let button;
let font;
let speech;

function preload() {
  font = loadFont('./assets/DotGothic16-Regular.ttf');  
}

function setup() {

/* both these speech functions are necessary since they have two
different roles: the first one is for speech recognition,
while the second one is to identify the volume of the words spoken */
  foo = new p5.SpeechRec('en-US');
  mic = new p5.AudioIn();

/* text to speech functions */
  speech = new p5.Speech();
  speech.speak('Be loud'); //why the French accent????

  createCanvas(windowWidth, windowHeight);
  background("#08080F");

  	
	/* boolean to set whether the speech recognition engine will
	 give results continuously (true) or just once (false).
	 Default is false. */
	foo.continuous = false;
	
	/* boolean to set whether the speech recognition engine will give
   faster, partial results (true) or wait for the speaker to pause (false).
   Default is false */
	foo.interimResults = false;

}

function draw() {
  fill("white");

  textFont(font);
  textSize(30);
  textAlign(CENTER);
	text("Be loud", width/2, height/4);

  // mic button
  button = createImg("./assets/mic.svg");
  button.size(80, 80);
  imageMode(CENTER);
  button.position(width/2-40, height/3);
  button.mousePressed(startMic);
}

/* whenever the mic isn't able to hear anything,
it will show this message */
function showError() {
	console.log('There is an error');
  fill("red");
	text('There is an error', windowWidth/2, windowHeight/2+100);
}

/* this function makes the written text appear.
The size on the text is based on how loud the 
person is speaking (approximately, since the volume 
goes from 0 to 1, but the variation can be really minimal.
That's what the map function is for) */
function showResult() {
  console.log(foo.resultString);
  fill("white");

  let vol = mic.getLevel();
  let v = map(vol, 0, 0.2, 20, 10000);
  textSize(v);
  textFont(font);
  textAlign(CENTER);
	text(foo.resultString, width/2-(width-100)/2, height/2+100, width-100);
  console.log(v);
  speech.speak(foo.resultString); //why the French accent????

}

/* this is the function that actually
starts the mic and activates the two
speech recognition functions (showResult
and showError) */
function startMic() {
  background("#08080F");
  foo.start(); 
	foo.onResult = showResult;
	foo.onError = showError; 
  mic.start();
}
