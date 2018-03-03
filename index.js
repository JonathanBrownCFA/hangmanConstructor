  var inquirer = require('inquirer');
  var guessWordList = require('./wordList.js');
  var checkForLetter = require('./word.js');
  var lettersToDisplay = require('./letter.js');

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var lettersAlreadyGuessed = [];
  var lettersCorrectlyGuessed = [];
  var displayHangman;

  var game = {
  	wordBank: guessWordList,
  	guessesRemaining: 10,
  	currentWord: null,

  	startGame: function () {
  		this.guessesRemaining = 10;
  		var j = Math.floor(Math.random() * this.wordBank.length);
  		this.currentWord = this.wordBank[j];
  		console.log("I'm thinking about a European country. Guess which one it is.")
  		displayHangman = new lettersToDisplay(this.currentWord);
  		displayHangman.parseDisplay();
  		console.log('Guesses Left: ' + game.guessesRemaining);
  		keepPromptingUser();

  	}

  };

  function keepPromptingUser() {
  	console.log('');
  	if (game.guessesRemaining > 0) {
  		inquirer.prompt([{
  			type: "value",
  			name: "letter",
  			message: "Guess a letter: "
  		}]).then(function (userInput) {
  			var inputLetter = userInput.letter.toLowerCase();
  			if (alphabet.indexOf(inputLetter) == -1) {
  				console.log(inputLetter + " is not a letter.");
  				console.log("Guesses Left: " + game.guessesRemaining);
  				console.log("Letters already guessed: " + lettersCorrectlyGuessed)
  				keepPromptingUser();
  			} else if (alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1) {


  				console.log("You already guessed " + inputLetter);
  				console.log("Guesses Left: " + game.guessesRemaining);
  				console.log("Letters already guessed: " + lettersCorrectlyGuessed)
  				keepPromptingUser();

  			} else {
  				lettersAlreadyGuessed.push(inputLetter);
  				var letterInWord = checkForLetter(inputLetter, game.currentWord);
  				if (letterInWord) {
  					lettersCorrectlyGuessed.push(inputLetter);
  					displayHangman = new lettersToDisplay(game.currentWord, lettersCorrectlyGuessed);
  					displayHangman.parseDisplay();
  					if (displayHangman.winner) {
  						console.log("You Win!");
  						return;
  					} else {
  						console.log("Guesses Left: " + game.guessesRemaining);
  						console.log("Letters already guessed: " + lettersCorrectlyGuessed)
  						keepPromptingUser();

  					}
  				} else {
  					game.guessesRemaining--;
  					displayHangman.parseDisplay()
  					console.log('Guesses Left: ' + game.guessesRemaining);
  					console.log('Letters already guessed: ' + lettersAlreadyGuessed);
  					keepPromptingUser();
  				}

  			}
  		});

  	} else {
  		console.log("You lost! The correct word was " + game.currentWord + ".");
  	}
  }

  game.startGame();