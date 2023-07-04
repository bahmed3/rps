  let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();

  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */

  let isAutoPlaying = false;
  let intervalId;

  function autoPlay() {
    if(!isAutoPlaying){
    intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  }

    document.body.addEventListener(`keydown`, (event) => {
      if(event.key === `r`){
        playGame(`rock`);
      } else if (event.key === `p`){
        playGame(`paper`);
      } else if(event.key === `s`){
        playGame(`scissors`);
      }
    })

  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You played scissors, computer played rock - You lose.';
      } else if (computerMove === 'paper') {
        result = 'You played scissors, computer played paper - You win.';
      } else if (computerMove === 'scissors') {
        result = 'Both you and the computer played scissors - Tie.';
      }
  
    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You played paper, computer played rock - You win.';
      } else if (computerMove === 'paper') {
        result = 'Both you and the computer played paper - Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You played paper, computer played scissors - You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Both you and the computer played rock - Tie.';
      } else if (computerMove === 'paper') {
        result = 'You played rock, computer played paper - You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You played rock, computer played scissors - You win.';
      }
    }

    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
    
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML =
    `You
      <img src="${playerMove}.png" class="move-icon">
      <img src="${computerMove}.png" class="move-icon">
    Computer`;
  }

  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }