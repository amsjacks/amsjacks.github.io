var numColors = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("button");
var modeButtons = document.querySelectorAll(".mode");

var defaultHeaderColor = h1.style.backgroundColor;
var defaultTextColor = h1.style.color;

init();

function init() {
	reset();
	updateDisplay();

	// Add square listeners
	for(var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(pickedColor);
				resetButton.textContent = "Play Again";
			} else {
				this.style.backgroundColor = "#111111";
				messageDisplay.textContent = "Try again"
			}
		});
	}	

	// Add button listeners
	resetButton.addEventListener("click", function(){
		this.textContent = "New Colors";
		reset();
		updateDisplay();
	})

	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			resetButtons(); 
			this.classList.add("selected");

			if (this.textContent === "Easy") {
				numColors = 3;
			} else {
				numColors = 6;
			}

			reset();
			updateDisplay();
		})
	}
}

function changeColors(color) {
	h1.style.backgroundColor = color;
	var selectedButton = document.querySelector(".selected")
	selectedButton.style.backgroundColor = color;
	resetButton.style.color = color;
	if (selectedButton.textContent === "Easy") {
		modeButtons[1].style.color = color;
	} else {
		modeButtons[0].style.color = color;
	}
			
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function reset() {
	changeColors(defaultHeaderColor);
	messageDisplay.textContent = "";
	colors = generateRandomColors(numColors);
	pickedColor = pickColor();
}

function updateDisplay() {
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr = [];
	for(var i = 0; i < num; i++) {
		arr.push(getRandomColor());
	}
	return arr;
}

function getRandomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function resetButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].classList.remove("selected");
		modeButtons[i].style.color = defaultHeaderColor;
		modeButtons[i].style.backgroundColor = defaultTextColor; 
	}
}
