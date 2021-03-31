 const cities = [
	"LONDON",
	"BIRMINGHAM",
	"LEEDS",
	"GLASGOW",
	"EDINBURGH",
	"LIVERPOOL",
	"MANCHESTER",
	"BRISTOL",
	"CARDIFF",
	"BELFAST",
	"BRIGHTON",
	"WESTMINSTER",
	"YORK",
	"CAMBRIDGE",
	"OXFORD"
];


let city = '';
let failedAttemps = 6;
let mistakes = 0;
let guessedLettersArray = [];
let cityName = null;
let message = document.querySelector('#keyboard');

const wordGenerator = () => {
  city = cities[Math.floor(Math.random() * cities.length)];
}

const keyboardGenerator = () => {
  let keyboard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(key =>
    `
      <button
        class="btn"
        id='` + key + `'
        onClick="handleGuess('` + key + `')"
      >
        ` + key + `
      </button>
    `).join('');
    
  document.querySelector('#keyboard').innerHTML = keyboard;
}

const handleGuess = (selectedLetter) => {
  guessedLettersArray.indexOf(selectedLetter) === -1 ? guessedLettersArray.push(selectedLetter) : null;
  document.getElementById(selectedLetter).setAttribute('disabled', true);
  document.getElementById(selectedLetter).style.backgroundColor = 'white';
  document.getElementById(selectedLetter).style.color = '#ac3636';



  if (city.indexOf(selectedLetter) >= 0) {
    guessedCityName();
    handleGameWon();
  } else if (city.indexOf(selectedLetter) === -1) {
    mistakes++;
    displayMistakes();
    handleGameLost();
    displayHangman();
  }
}

const displayHangman = () => {
  document.querySelector('#hangman-img').src = `./assets/${mistakes}.svg`;
}

const handleGameWon = () => {
  if (cityName === city) {
    message.innerHTML = '🥳🎉 WELL DONE !!! 🎉🥳';
    message.style.fontSize = '2.5rem';
    message.style.color = '#038603';
  }
 
}

const handleGameLost = () => {
  if (mistakes === failedAttemps) {
    document.querySelector('#city-name').innerHTML = 'The city was: ' + city;
    message.innerHTML = 'NOOPE...😞 TRY AGAIN...🤞🤞';
    message.style.fontSize = '2.5rem';
    message.style.color = 'red';
    
  }
  
}

const guessedCityName = () => {
  cityName = city.split('').map(letter => (guessedLettersArray.indexOf(letter) >= 0 ? letter : ' _ ')).join('');

  document.querySelector('#city-name').innerHTML = cityName;
}

const displayMistakes = () => {
  document.querySelector('#mistakes').innerHTML = mistakes;
}

const resetGame = () => {
  mistakes = 0;
  guessedLettersArray = [];
  document.querySelector('#hangman-img').src = './assets/0.svg';
  document.querySelector('.reset-btn').innerHTML = 'RESET';

  wordGenerator();
  guessedCityName();
  displayMistakes();
  keyboardGenerator();
}


