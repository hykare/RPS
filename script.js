'use strict';
const body = document.querySelector('body');

const buttonsDiv = document.createElement('div');
const buttonNames = ['Rock', 'Paper', 'Scissors'];
buttonNames.forEach(buttonName => {
    const button = document.createElement('button');
    button.textContent = buttonName;
    button.value = buttonName;
    buttonsDiv.appendChild(button);
});
body.appendChild(buttonsDiv);

const resultsBox = document.createElement('div');
resultsBox.id = 'round-results';
resultsBox.style.cssText = 'min-height: 40px; border: 1px solid lightgray';
body.appendChild(resultsBox);

buttonsDiv.addEventListener('click', playRound);

let playerScore = 0;
let computerScore = 0;

function playRound(e) {
    let playerSelection = e.srcElement.value;
    playerSelection = playerSelection.toUpperCase();
    const computerSelection = computerPlay();
    let roundResult = checkRoundWinner(playerSelection, computerSelection);
    updateScore(roundResult);
    displayRoundResult(roundResult);
}
function computerPlay() {
    let plays = ['Rock', 'Paper', 'Scissors'];
    let randomInt = Math.floor(Math.random() * 3);
    return plays[randomInt];
}
function checkRoundWinner(playerSelection, computerSelection) {
    if (
        (playerSelection === 'ROCK' && computerSelection === 'Scissors')
        || (playerSelection === 'PAPER' && computerSelection === 'Rock')
        || (playerSelection === 'SCISSORS' && computerSelection === 'Paper')
    ) return 'PLAYER';
    else if (
        (playerSelection === 'ROCK' && computerSelection === 'Paper')
        || (playerSelection === 'PAPER' && computerSelection === 'Scissors')
        || (playerSelection === 'SCISSORS' && computerSelection === 'Rock')
    ) return 'COMPUTER';
    else return "TIE";
}
function updateScore(roundResult) {
    if (roundResult == 'PLAYER') playerScore++;
    else if (roundResult == 'COMPUTER') computerScore++;
}
function displayRoundResult(roundResult){
    resultsBox.textContent = roundResult;
}