/*******VARIABLE**********/
const diceDiv = document.getElementById("diceDiv")
let activePlayer = 'player 1'
let globalScore = 0
let currentScore = 0

document.querySelector(".holdDiv").addEventListener("click", () =>{
  hold()
})
document.querySelector(".rollDiceDiv").addEventListener("click", () =>{
  rollDice()
})

/*FONCTION GENERATION ALEA*/
function rollDice(){
  const randomDice = Math.floor(Math.random() * 6 + 1)
  const result = randomDice
  console.log(result)
  const imgDice = document.querySelector("#imgDice")
  imgDice.src = './images/dice' + result +'.png'
  /*****AJOUT POINT AU CURRENT SCORE****/
  if(result > 1){
    currentScore + result
    console.log('continu à jouer')
  }
  else{
    switchPlayer()
  }
}


/*********CHANGEMENT DE JOUEUR********/
function switchPlayer() {
  if (activePlayer === 'player 1') {
    activePlayer = 'player 2'
  } else {
    activePlayer = 'player 1'
  }
  //changer la variable par joueur
  switch (activePlayer) {
    case 'player 1': {
      console.log("Joueur 1")
      const currentScorePlayerOne = document.getElementById("currentScorePlayerOne")
      const globalScorePlayerOne = document.getElementById("globalScorePlayerOne")
      currentScorePlayerOne.textContent = currentScore
      globalScorePlayerOne.textContent = globalScore
      break;
    }
    case 'player 2': {
      console.log("Joueur 2")
      const currentScorePlayerTwo = document.getElementById("currentScorePlayerTwo")
      const globalScorePlayerTwo = document.getElementById("globalScorePlayerTwo")
      currentScorePlayerTwo.textContent = currentScore
      globalScorePlayerTwo.textContent = globalScore
      break
    }
    default: {
      console.log('erreur de sélection de joueur');
    }
  } 
}

/*******FONCTION HOLD*********/
function hold(){
  globalScore += currentScore
  globalScore.textContent = globalScore
  current = 0
  if(globalScore >= 100){
    diceDiv.innerHTML = `${activePlayer} win`
  }
  switchPlayer()
  currentScorePlayerOne = document.getElementById("currentScorePlayerOne").textContent = 0
  currentScorePlayerTwo = document.getElementById("currentScorePlayerTwo").textContent = 0

}

