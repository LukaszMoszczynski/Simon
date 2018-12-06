let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let highscore = 0;

function nextSequence() {

	userClickedPattern = [];

	let randomNumber = Math.floor( (Math.random() * 4) );
	let randonChosenColours = buttonColours[randomNumber];

	let chosen = $("." + randonChosenColours);
	chosen.fadeOut(200).fadeIn(200);

	playSound(randonChosenColours);

	level++;
	$("#level-title").text("Level " + level);

	setHighscore();
	
	gamePattern.push(randonChosenColours);
	
}

function setHighscore() {
	if (gamePattern.length > highscore) {

		highscore++;
		$(".highscore").text("Level " + highscore);
		
	}
}

function playSound(name) {

	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();

}

function animatePress(currentColour, className) {

	$(currentColour).addClass(className);
	setTimeout(function () { 
		$(currentColour).removeClass(className); 
	}, 200);

}


function endGame() {

	playSound("wrong");

	animatePress("body", "game-over");

	gamePattern = [];	
	level = 0;
	$("#level-title").text("Game over, Press a key to restart");

}


function checkAnswer(currentLevel) {

	if ( userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout( function() {
				nextSequence();
			}, 1000);	
		}
	}

	else {
		endGame();
	}
}

$(".btn").on('click', function() {
	

	let userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);

	animatePress(this, "pressed");

	playSound(userChosenColour);

	checkAnswer(userClickedPattern.length-1);

});


$(document).on('keypress', function() {

	if (level === 0 ) {
		nextSequence();
	}

});