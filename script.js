function computerPlay() {
    let plays = ['Rock', 'Paper', 'Scissors'];
    let randomInt = Math.floor(Math.random() * 3);
    return plays[randomInt];
}

const playerSelection = 'Rock';
const computerSelection = computerPlay();

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();
    if (
        (playerSelection === 'ROCK' && computerSelection === 'Scissors')
        || (playerSelection === 'PAPER' && computerSelection === 'Rock')
        || (playerSelection === 'SCISSORS' && computerSelection === 'Paper')
    ) {
        return 'you win!';
    }
    else if (
        (playerSelection === 'ROCK' && computerSelection === 'Paper')
        || (playerSelection === 'PAPER' && computerSelection === 'Scissors')
        || (playerSelection === 'SCISSORS' && computerSelection === 'Rock')
    ) {
        return 'you lose!';
    }
    else return "it's a tie";
}

function game() {

    for (let i = 0; i < 5; i++) {
        console.log(playRound(playerSelection, computerSelection));

    }

