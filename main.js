const leftScore = document.getElementById('left-score');
const rightScore = document.getElementById('right-score');
const leftChoice = document.getElementById('left-choice');
const rightChoice = document.getElementById('right-choice');
const leftRockBtn = document.getElementById('left-rock');
const leftPaperBtn = document.getElementById('left-paper');
const leftScissorsBtn = document.getElementById('left-scissors');
const rightRockBtn = document.getElementById('right-rock');
const rightPaperBtn = document.getElementById('right-paper');
const rightScissorsBtn = document.getElementById('right-scissors');
const roundNum = document.getElementById('round-number');
const arrow = document.getElementById('arrow');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');

// const rpsImages = [
//   {name: 'rock', image: '/rock.svg'},
// ]

class Game {
  constructor(leftCPU=false, rightCPU=true) {
    this.round = 1;
    this.message = 'Select an option below to start the game...';
    this.whosTurn = 'left';
    this.prevWinner = null;
    this.animating = false;
    this.leftScore = 0;
    this.rightScore = 0;
    this.leftChoice = null;
    this.rightChoice = null;
    this.leftCPU = leftCPU;
    this.rightCPU = rightCPU;
  }
}

const game = new Game();

const handleRPSClick = (player, cmd) => {
  // console.log(player, cmd);

  if (game.whosTurn === player && game.animating === false) {
    if (player === 'left' && !game.leftCPU) {
      game.leftChoice = cmd;
    } else if (player === 'right' && !game.rightCPU) {
      game.rightChoice = cmd;
    }

    game.rightChoice = getCPUChoice();
    updateGame();
    updateUI();
  }
}

const updateGame = () => {
  let winner;
  if (game.leftChoice && game.rightChoice) {
    winner = compareRPS(game.leftChoice, game.rightChoice);
    game.prevWinner = winner;
    game.round += 1;
  }

  if (winner === 'left') {
    game.leftScore += 1;
    game.message = `Left wins the round! (${game.leftChoice} beats ${game.rightChoice})`;
  } else if (winner === 'right') {
    game.rightScore += 1;
    game.message = `Right wins the round! (${game.leftChoice} loses to ${game.rightChoice})`;
  } else {
    game.message = `It's a draw! (${game.leftChoice} vs. ${game.rightChoice})`;
  };
}

const updateUI = async () => {
  animateChoice()
  .then(() => {
    roundNum.innerText = game.round;
    message.innerText = game.message;
    leftScore.innerText = game.leftScore;
    rightScore.innerText = game.rightScore;
    leftChoice.src = `public/${game.leftChoice}.svg`;
    rightChoice.src = `public/${game.rightChoice}.svg`;

    if (game.prevWinner === 'left') {
      arrow.classList.add('left');
      arrow.classList.remove('right');
    } else if (game.prevWinner === 'right') {
      arrow.classList.add('right');
      arrow.classList.remove('left');
    } else {
      arrow.classList.remove('right');
      arrow.classList.remove('left');
    }
  })
  .then(() => {
    game.animating = false;
    // console.log('done animating!');
  });
}

const animateChoice = (duration=300) => {
  const choices = ['rock', 'paper', 'scissors'];
  game.animating = true;
  // console.log('animating...');

  for (let i = 0; i < choices.length - 1; i++) {
    const randomChoice1 = choices[Math.floor(Math.random() * choices.length)];
    const randomChoice2 = choices[Math.floor(Math.random() * choices.length)];

    setTimeout(() => {
      leftChoice.src = `public/${randomChoice1}.svg`;
      rightChoice.src = `public/${randomChoice2}.svg`;
    }, i * duration);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, (choices.length - 1) * duration);
  });
}

const compareRPS = (left, right) => {
  if (left === 'rock') {
    if (right === 'paper') return 'right';
    if (right === 'scissors') return 'left'
  } else if (left === 'paper') {
    if (right === 'rock') return 'left';
    if (right === 'scissors') return 'right';
  } else if (left === 'scissors') {
    if (right === 'rock') return 'right';
    if (right === 'paper') return 'left';
  }

  return 'draw';
}

const getCPUChoice = () => {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

const handleReset = () => {
  console.log('resetting game...');
}

leftRockBtn.addEventListener('click', () => handleRPSClick('left', 'rock'));
leftPaperBtn.addEventListener('click', () => handleRPSClick('left', 'paper'));
leftScissorsBtn.addEventListener('click', () => handleRPSClick('left', 'scissors'));
rightRockBtn.addEventListener('click', () => handleRPSClick('right', 'rock'));
rightPaperBtn.addEventListener('click', () => handleRPSClick('right', 'paper'));
rightScissorsBtn.addEventListener('click', () => handleRPSClick('right', 'scissors'));
resetBtn.addEventListener('click', () => handleReset());
