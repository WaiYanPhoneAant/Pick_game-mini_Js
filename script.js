'use strict';
const score0El=document.getElementById('score--0');
const scorelEl=document.getElementById('score--1');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');
const diceEl=document.querySelector('.dice');
const diceNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');
const btnNew=document.querySelector('.btn--new');
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
const p0win=document.querySelector('.p0-win');
const p1win=document.querySelector('.p1-win');




diceEl.classList.add('hidden');

let currentScore,activePlayer,playing,scores;

const init=()=>{
    scores=[0,0];
    playing=true;
    currentScore=0;
    activePlayer=0;
    
    score0El.textContent=0;
    scorelEl.textContent=0;
    current0El.textContent = 0;
    current1El.textContent = 0;
  
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
    p0win.classList.add('hidden');
    p1win.classList.add('hidden');



}

// still in normal positio
init();

//for player switching
const switchPlayer=()=>{
    document.getElementById(`current--${activePlayer}`).textContent=0;
    activePlayer=activePlayer ===0 ? 1:0;
    currentScore=0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Rolling dice functionality
btnRoll.addEventListener('click',()=>{
    if(playing){
        // Generate random dice value;
        const dice=Math.trunc(Math.random()*6)+1;
        
        diceEl.classList.remove('hidden');
        diceEl.src=`source_img/dice-${dice}.png`;
        
        if(dice!==1){ 
            currentScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        }else{
            document.getElementById(`current--${activePlayer}`).textContent=0;
            switchPlayer();
      
    }
    }
});
btnHold.addEventListener('click',()=>{
    if(playing){
        // to add currentScore to active palyer score
        scores[activePlayer]+=currentScore;

        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
        if(scores[activePlayer]>=100){
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.p${activePlayer}-win`).classList.remove('hidden');
            btnRoll.classList.add('hidden');
            btnHold.classList.add('hidden');
            diceEl.classList.add('hidden');

            //for game over 
            playing=false;
        }else{
            switchPlayer();
        }
    }
    
})


// to restart game
btnNew.addEventListener('click',init)