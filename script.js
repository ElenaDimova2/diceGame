'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let scores, currentScore, activePlayer, playing;

// methods
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  console.log(`active player is ${activePlayer}`);
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//starting condition method
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// --------
init();
// --------

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  //if player is in play button Roll is clickable, if not button Roll is disabled
  if (playing) {
    //1. Generate random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(`Dice number is ${dice}`);

    //2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1: if true switch to next player
    if (dice !== 1) {
      //3.1 if false add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //3.2 switch do next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //if player is in play button Hold is clickable, if not button Hold is disabled
  if (playing) {
    // 1. Add curent score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(`scores are ${scores}`);

    // 2. Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      // if true, Finish the game
      // ----------------------------
      playing = false; //winner has been chosen make buttons not clickable
      diceEl.classList.add('hidden'); //hide dice image
      // ----------------------------
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //else, Switch to next player
      switchPlayer();
    }
  }
});

//set everything to default
btnNew.addEventListener('click', init);
