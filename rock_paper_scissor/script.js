let userScore = 0;
let computerScore = 0;
const userScoreDiv = document.getElementById('userscore');
const computerScoreDiv = document.getElementById('computerscore');
const tools = ['Rock', 'Paper', 'Scissor']
const choices = $('.choice')
const explain = $('.explain')
const restartButton = $('#restart')

function computerChoice() {
    let num = Math.floor(Math.random() * 3);
    return tools[num];
}

// game rules and conditions (implementing win/loose/draw function)
function play(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        draw(userSelection, computerSelection);
        return;
    }
    if (userSelection === 'Rock'){
        if (computerSelection === 'Scissor'){
            win(userSelection, computerSelection);
            return;
        } else {
            loose(userSelection, computerSelection);
            return;
        }
    }
    if (userSelection === 'Paper'){
        if (computerSelection === 'Rock'){
            win(userSelection, computerSelection);
            return;
        } else {
            loose(userSelection, computerSelection);
            return;
        }
    }
    if (userSelection === 'Scissor'){
        if (computerSelection === 'Paper'){
            win(userSelection, computerSelection);
            return;
        } else {
            loose(userSelection, computerSelection);
            return;
        }
    }
}

// action to do when user win a round
function win(userSelection, computerSelection){
    userScore = userScore +1;
    userScoreDiv.innerHTML = userScore;
    explain.html(`You won,${userSelection} beats ${computerSelection}!`);
    $('#' + userSelection).addClass('green-glow');
    setTimeout(() => $('#' + userSelection).removeClass('green-glow'), 300);
    if (userScore === 5) {
        endGame();
    }
}

// action to do when user loose a round
function loose(userSelection, computerSelection){
    computerScore = computerScore +1;
    computerScoreDiv.innerHTML = computerScore;
    explain.html(`Computer won,${computerSelection} beats ${userSelection}!`);
    $('#' + userSelection).addClass('red-glow');
    setTimeout(() => $('#' + userSelection).removeClass('red-glow'), 300);
    if (computerScore === 5) {
        endGame();
    }
}

// action to do when user get a tie in round
function draw(userSelection, computerSelection){
    explain.html(`Tie, both player chose ${userSelection}`); 
    $('#' + userSelection).addClass('gray-glow');
    setTimeout(() => $('#' + userSelection).removeClass('gray-glow'), 300);
}

// stoping event listener and announcing the winner
function endGame () {
    endGameDiv = document.querySelector('#endgame');
    endGameDiv.style.display = 'flex';
    endGameDiv.style.color = (userScore >= 5)? 'gold': 'red';
    restartButton.addClass( (userScore >= 5)? 'btn-gold': 'btn-danger');
    $('#result').html( (userScore >= 5)? 'You Won!': 'You Lose!');
    choices.each( function (){
        $(this).off('click')
    })
}

// returning score to zero and re-run event listener
function restart() {
    userScore = 0;
    computerScore = 0;
    userScoreDiv.innerHTML = '0';
    computerScoreDiv.innerHTML = '0';
    $('#endgame').css({'display':'none'})
    restartButton.removeClass(["btn-danger", "btn-gold"])
    explain.html('Choose a tool by clicking on it')
    choices.each(function() {
        $(this).on("click", function(){
        itemId = $(this).attr('id');
        play(itemId, computerChoice())
        })
    })
}

// adding restart function to the restart button
restartButton.click( function(){
    restart()
})

// adding play a round function to every choice button(rock, paper, scissor)
choices.each(function() {
    $(this).on("click", function(){
    itemId = $(this).attr('id');
    play(itemId, computerChoice())
    })
})

// disallow images dragging
document.getElementById('r').setAttribute('draggable', false);
document.getElementById('p').setAttribute('draggable', false);
document.getElementById('s').setAttribute('draggable', false);

