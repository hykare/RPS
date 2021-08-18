'use strict';
const body = document.querySelector('body');
const main = document.createElement('main');

const score = document.createElement('div');
score.id = 'score';
score.textContent = '0 : 0';
main.appendChild(score);

const playerButtons = document.createElement('div');
const computerButtons = document.createElement('div');
playerButtons.id = 'player-buttons';
computerButtons.id = 'computer-buttons';
const buttonNames = ['Rock', 'Paper', 'Scissors'];
buttonNames.forEach(buttonName => {
    const playerbutton = document.createElement('button');
    const computerButton = document.createElement('button');
    playerbutton.classList.add('rps-button');
    computerButton.classList.add('rps-button');
    playerbutton.value = buttonName;
    computerButton.value = buttonName;
    playerButtons.appendChild(playerbutton);
    computerButtons.appendChild(computerButton);
});
main.appendChild(playerButtons);
main.appendChild(computerButtons);

const middleDiv = document.createElement('div');
middleDiv.style.width = '100%';

const playerCurrentSelection = document.createElement('div');
const playerLeftDiv = document.createElement('div');
const playerRightDiv = document.createElement('div');
playerCurrentSelection.classList.add('current-selection');
playerCurrentSelection.style.display = 'flex';
playerCurrentSelection.style.justifyContent = 'center';
playerLeftDiv.textContent = 'you chose:';
playerRightDiv.textContent = '...';
playerCurrentSelection.appendChild(playerLeftDiv);
playerCurrentSelection.appendChild(playerRightDiv);

const computerCurrentSelection = document.createElement('div');
const computerLeftDiv = document.createElement('div');
const computerRightDiv = document.createElement('div');
computerCurrentSelection.classList.add('current-selection');
computerCurrentSelection.style.display = 'flex';
computerCurrentSelection.style.justifyContent = 'center';
computerLeftDiv.textContent = 'computer chose:';
computerRightDiv.textContent = '...';
computerCurrentSelection.appendChild(computerLeftDiv);
computerCurrentSelection.appendChild(computerRightDiv);

middleDiv.appendChild(playerCurrentSelection);
middleDiv.appendChild(computerCurrentSelection);

const resultsBox = document.createElement('div');
resultsBox.id = 'round-results';
middleDiv.insertBefore(resultsBox, computerCurrentSelection);
main.insertBefore(middleDiv, computerButtons);

const playAgain = document.createElement('button');
playAgain.id = 'play-again';
playAgain.textContent = 'play again';
playAgain.style.display = 'none';
main.appendChild(playAgain);

body.appendChild(main);

playAgain.addEventListener('click', resetGame);
playerButtons.addEventListener('click', playRound);

let playerScore = 0;
let computerScore = 0;

function playRound(e) {
    const playerSelection = e.srcElement.value;
    const computerSelection = computerPlay();
    displayCurrentSelections(playerSelection, computerSelection);
    let roundResult = checkRoundWinner(playerSelection, computerSelection);
    updateScore(roundResult);
    displayRoundResult(roundResult, playerSelection, computerSelection);
    if (playerScore >= 5 || computerScore >= 5) endGame(roundResult);
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
function displayRoundResult(roundResult, playerSelection, computerSelection) {
    let message;
    if (roundResult == 'PLAYER') {
        message = `you win! ${playerSelection} beats ${computerSelection}`;
    }
    else if (roundResult == 'COMPUTER') {
        message = `you lose! ${computerSelection} beats ${playerSelection}`;
    }
    else message = "it's a tie";
    resultsBox.textContent = message;
}
function displayCurrentSelections(playerSelection, computerSelection) {
    playerRightDiv.textContent = playerSelection;
    computerRightDiv.textContent = computerSelection;
}
function endGame(roundResult) {
    disablePlayerButtons();
    displayGameResults(roundResult);
    playAgain.style.display = '';
}
function resetGame(e) {
    playerScore = 0;
    computerScore = 0;
    score.textContent = `${playerScore} : ${computerScore}`;
    playerRightDiv.textContent = '...';
    computerRightDiv.textContent = '...';
    resultsBox.textContent = '';
    const buttons = document.querySelectorAll('.rps-button');
    buttons.forEach(button => {
        button.disabled = false;
    });
    playAgain.style.display = 'none';
}
function disablePlayerButtons() {
    const buttons = document.querySelectorAll('.rps-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}
function displayGameResults(roundResult) {
    if (roundResult == 'PLAYER') resultsBox.textContent = 'Congratulations! You Won!';
    else resultsBox.textContent = 'You lost! Maybe next time...';
}