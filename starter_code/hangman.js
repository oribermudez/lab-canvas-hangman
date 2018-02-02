var hangman;

 function Hangman() {
  this.words = ["uno","dos","tres"];
  this.secretWord = "";
  this.letters = [];
  this.guessedLetter = "";
  this.errorsLeft = 10;
 }

Hangman.prototype.getWord = function () {
  return this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
};

Hangman.prototype.checkIfLetter = function (keyCode) {
  if( 64 < keyCode && keyCode < 91){
    return true
  } else {
    return false;
  } 
};

Hangman.prototype.checkClickedLetters = function (key) {
  if(this.letters.indexOf(key) !== -1 ){
    return false;
  } else {
  return true;
  }
};

Hangman.prototype.addCorrectLetter = function (i) {
  //Regresa el valor de la secretWord que se encuentra en la posición i y lo agrega a guessedLetter
   this.guessedLetter += this.secretWord[i].toUpperCase();

};

Hangman.prototype.addWrongLetter = function (letter) {
  this.errorsLeft--;
};

Hangman.prototype.checkGameOver = function () {
  if(this.errorsLeft === 0){
    return true;
  } else {
    return false;
  }
};

Hangman.prototype.checkWinner = function () {
  if(this.secretWord.length === this.guessedLetter.length){
    return true;
  } else {
    return false;
  }
};

document.getElementById('start-game-button').onclick = function () {
  hangman = new Hangman();
  hangman.secretWord = hangman.getWord();
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
  hangmanCanvas.drawLines();
  console.log(hangmanCanvas);
};


document.onkeydown = function (e) {
  if (hangman.checkIfLetter(e.keyCode)){
    var upper = e.key.toUpperCase();
    if (hangman.checkClickedLetters(upper)){
      hangman.letters.push(upper);
      if (hangman.secretWord.indexOf(upper)!==-1){
        hangmanCanvas.writeCorrectLetter(hangman.secretWord.indexOf(upper));
        hangman.addCorrectLetter(hangman.secretWord.indexOf(upper));
        if(hangman.checkWinner()){hangmanCanvas.winner();}
      } else {
        hangman.addWrongLetter();
        hangmanCanvas.writeWrongLetter(upper, hangman.errorsLeft);
      }
    }
  }
};
