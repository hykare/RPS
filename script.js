'use strict';
const body = document.querySelector('body');
const main = document.createElement('div');
main.id = 'main';
body.appendChild(main);

const score = document.createElement('div');
score.id = 'score';
score.textContent = '0 : 0';
main.appendChild(score);

const buttonsDiv = document.createElement('div');
const buttonNames = ['Rock', 'Paper', 'Scissors'];
buttonNames.forEach(buttonName => {
    const button = document.createElement('button');
    button.classList.add('rps-button');
    button.textContent = buttonName;
    button.value = buttonName;
    buttonsDiv.appendChild(button);
});
main.appendChild(buttonsDiv);

const playerCurrentSelection = document.createElement('div');
const computerCurrentSelection = document.createElement('div');
playerCurrentSelection.textContent = 'player: ';
computerCurrentSelection.textContent = 'computer: ';
main.appendChild(playerCurrentSelection);
main.appendChild(computerCurrentSelection);

const resultsBox = document.createElement('div');
resultsBox.id = 'round-results';
main.appendChild(resultsBox);

const playAgain = document.createElement('button');
playAgain.textContent = 'play again';
playAgain.style.display = 'none';
main.appendChild(playAgain);

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
    playAgain.style.display = '';
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
    playAgain.style.display = 'none';
}