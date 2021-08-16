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
    button.classList.add('rps-button');
    button.textContent = buttonName;
    button.value = buttonName;
    buttonsDiv.appendChild(button);
});
body.appendChild(buttonsDiv);

const playerCurrentSelection = document.createElement('div');
const computerCurrentSelection = document.createElement('div');
playerCurrentSelection.textContent = 'player: ';
computerCurrentSelection.textContent = 'computer: ';
body.appendChild(playerCurrentSelection);
body.appendChild(computerCurrentSelection);

const resultsBox = document.createElement('div');
resultsBox.id = 'round-results';
resultsBox.style.cssText = 'min-height: 40px; border: 1px solid lightgray';
body.appendChild(resultsBox);

const playAgain = document.createElement('button');
playAgain.textContent = 'play again';
body.appendChild(playAgain);

playAgain.addEventListener('click', resetGame);
buttonsDiv.addEventListener('click', playRound);

let playerScore = 0;
let computerScore = 0;

function playRound(e) {
    const playerSelection = e.srcElement.value;
    const computerSelection = computerPlay();
    displayCurrentSelections(playerSelection, computerSelection);
    let roundResult = checkRoundWinner(playerSelection, computerSelection);
    updateScore(roundResult);
    displayRoundResult(roundResult);
    if (playerScore >= 5 || computerScore >= 5) gameEnd(roundResult);
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
function displayCurrentSelections(playerSelection, computerSelection) {
    playerCurrentSelection.textContent = `player: ${playerSelection}`;
    computerCurrentSelection.textContent = `computer: ${computerSelection}`;
}
function gameEnd(roundResult) {
    if (roundResult == 'PLAYER') resultsBox.textContent = 'Congratulations! You Won!';
    else resultsBox.textContent = 'You lost! Maybe next time...';
    const buttons = document.querySelectorAll('.rps-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}
function resetGame(e) {
    playerScore = 0;
    computerScore = 0;
    score.textContent = `${playerScore} : ${computerScore}`;
    playerCurrentSelection.textContent = 'player: ';
    computerCurrentSelection.textContent = 'computer: ';
    resultsBox.textContent = '';
    const buttons = document.querySelectorAll('.rps-button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}