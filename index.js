let randomNumber = parseInt(Math.random()*100+1)
const form = document.querySelector('form')
const guessedInput = document.getElementById('guessed-input')

const prevGuesses = document.querySelector('.guesses')
const guessesRemaining = document.querySelector('.guesses-remaining')
const lowOrHi = document.querySelector('.low-high')
const startOver = document.querySelector('.result')

const p = document.createElement('p')

let guessesArray = []
let attempts = 1

let playGame = true

if(playGame){
    form.addEventListener('submit',function(e){
        e.preventDefault();
        const guessedInputNumber =  parseInt(guessedInput.value);
        validate(guessedInputNumber)
    })
}
function validate(guessedNum){
    if(isNaN(guessedNum)){
        alert('Please enter only number between 1 and 100!')
    }
    else if(guessedNum < 1){
        alert("Please enter a number greater than zero!")
    }
    else if(guessedNum > 100){
        alert("Please enter a number less than 100!")
    }
    else{
        if(attempts === 10){
            displayGuess(guessedNum)
            displayMessage(`Game Over ! Random number was ${randomNumber}`)
            endGame()
        }
        else if(guessedNum === randomNumber){
            checkGuess(guessedNum)
            endGame();
        }
        else{
            guessesArray.push(guessedNum)
            displayGuess(guessedNum)
            checkGuess(guessedNum)
        }
    }
}

function checkGuess(guessedNum){
    if(guessedNum === randomNumber){
        displayMessage("Congratulations! You guessed it right")
    }
    else if(guessedNum > randomNumber){
        displayMessage("You are on the higher side")
    }
    else{
        displayMessage("You are on the lower side")
    }
}

function displayGuess(guessedNum){
    guessedInput.value = ''
    prevGuesses.innerHTML += ` ${guessedNum}`
    guessesRemaining.innerHTML = `${10-attempts}`
    attempts++
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    guessedInput.value = '';
    guessedInput.setAttribute('disabled','');
    p.classList.add('button')
    p.innerHTML = `<button id="new-game" style="font:inherit">New Game</button>`
    startOver.appendChild(p)
    playGame = false
    newGame()
}
function newGame(){
    const newGameButton = document.getElementById('new-game')
    newGameButton.addEventListener('click',function(e){
        randomNumber = parseInt(Math.random()*100+1);
        prevGuesses.innerHTML = '';
        guessesArray = [];
        attempts = 1;
        guessesRemaining.innerHTML = '10'
        guessedInput.removeAttribute('disabled');
        lowOrHi.innerHTML = ''
        startOver.removeChild(p);
        playGame = true
    })
}