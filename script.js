function computerPlay() {
    let plays = ['Rock', 'Paper', 'Scissors'];
    let randomInt = Math.floor(Math.random() * 3);
    return plays[randomInt];
}
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();
    if (
        (playerSelection === 'ROCK' && computerSelection === 'Scissors')
        || (playerSelection === 'PAPER' && computerSelection === 'Rock')
        || (playerSelection === 'SCISSORS' && computerSelection === 'Paper')
    ) return 'you win!';
    else if (
        (playerSelection === 'ROCK' && computerSelection === 'Paper')
        || (playerSelection === 'PAPER' && computerSelection === 'Scissors')
        || (playerSelection === 'SCISSORS' && computerSelection === 'Rock')
    ) return 'you lose!';
    else return "it's a tie";
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt('choose your weapon');
        const computerSelection = computerPlay();
        let roundResult = playRound(playerSelection, computerSelection);
        console.log(roundResult);
        if (roundResult == 'you win!') playerScore++;
        else if (roundResult == 'you lose!') computerScore++;
    }
    if(playerScore>computerScore) console.log('PLAYER WINS');
    else if(playerScore<computerScore) console.log('COMPUTER WINS');
    else console.log("IT'S A TIE");

}
game();