'use strict';
const body = document.querySelector('body');

const score = document.createElement('div');
score.style.cssText = 'min-height: 40px; max-width: 200px; border: 1px solid grey';
score.textContent = '0 : 0';
body.appendChild(score);

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
    const playerSelection = e.srcElement.value;
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
        (playerSelection === 'Rock' && computerSelection === 'Scissors')
        || (playerSelection === 'Paper' && computerSelection === 'Rock')
        || (playerSelection === 'Scissors' && computerSelection === 'Paper')
    ) return 'PLAYER';
    else if (
        (playerSelection === 'Rock' && computerSelection === 'Paper')
        || (playerSelection === 'Paper' && computerSelection === 'Scissors')
        || (playerSelection === 'Scissors' && computerSelection === 'Rock')
    ) return 'COMPUTER';
    else return "TIE";
}
function updateScore(roundResult) {
    if (roundResult == 'PLAYER') playerScore++;
    else if (roundResult == 'COMPUTER') computerScore++;
    score.textContent = `${playerScore} : ${computerScore}`;
}
function displayRoundResult(roundResult) {
    resultsBox.textContent = roundResult;
}