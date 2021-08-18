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

const resultsBox = document.createElement('div');
resultsBox.id = 'round-results';
main.insertBefore(resultsBox, computerButtons);

const playerCurrentSelection = document.createElement('div');
const computerCurrentSelection = document.createElement('div');
playerCurrentSelection.textContent = 'player: ';
computerCurrentSelection.textContent = 'computer: ';
main.appendChild(playerCurrentSelection);
main.appendChild(computerCurrentSelection);

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
    else if(roundResult=='COMPUTER'){
        message = `you lose! ${computerSelection} beats ${playerSelection}`;
    }
    else message = "it's a tie";
    resultsBox.textContent = message;
}
function displayCurrentSelections(playerSelection, computerSelection) {
    playerCurrentSelection.textContent = `player: ${playerSelection}`;
    computerCurrentSelection.textContent = `computer: ${computerSelection}`;
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
    playerCurrentSelection.textContent = 'player: ';
    computerCurrentSelection.textContent = 'computer: ';
    resultsBox.textContent = '';
    const buttons = document.querySelectorAll('.rps-button');
    buttons.forEach(button => {
        button.disabled = false;
    });
    playAgain.style.display = 'none';
}
function disablePlayerButtons(){
    const buttons = document.querySelectorAll('.rps-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}
function displayGameResults(roundResult){
    if (roundResult == 'PLAYER') resultsBox.textContent = 'Congratulations! You Won!';
    else resultsBox.textContent = 'You lost! Maybe next time...';
}