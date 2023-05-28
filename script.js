import { Confetti} from './lib/confetti.js'

/**LES VARIABLES**/
let namePlayerOne = prompt('Nom du joueur :')
let namePlayerTwo = prompt('Nom du joueur :')
document.getElementById("namePlayerOne").innerText = namePlayerOne
document.getElementById("namePlayerTwo").innerText = namePlayerTwo

let nameOnePara = document.querySelector(".nameOne")
let nameTwoPara = document.querySelector(".nameTwo")
let divPlayerOne = document.querySelector(".divPlayerOne")
let divPlayerTwo = document.querySelector(".divPlayerTwo")
let winDiv = document.getElementById("win")
let actifPlayer
let gameRound = 0

/***CLASSE JOUEUR***/
class Player {
  constructor(name, globalScore, currentScore, round, win){
    this.nam = name
    this.globalScore = globalScore
    this.currentScore = currentScore
    this.round = false
    this.win = false
  }
}

const playerOne = new Player(namePlayerOne, 0, 0, false, false)
const playerTwo = new Player(namePlayerTwo, 0, 0, false, false)
const players = [playerOne, playerTwo]


/****AJOUT EVENEMENTS****/
document.getElementById("newGame").addEventListener("click", () => {
  location.reload();
})

document.querySelector('.rollDiceDiv').addEventListener("click", () =>{
  rollDice()
})

document.querySelector(".holdDiv").addEventListener("click", () => {
  hold()
})

/*****FONCTION NEW GAME*******/
// function newGame(){
//   Confetti.stopAnimationConfeti()
//   winDiv.innerText = ''
//   gameRound = 0
//   playerOne.globalScore = '0'
//   playerTwo.globalScore = '0'
// }

/********FONCTION ROLL DICE (nb aléa et changement de joueur********/
function rollDice(){
  winDiv.innerText = ''
  const randomDice = Math.floor(Math.random() * 6 + 1)
  const result = randomDice
  console.log(result)
  const imgDice = document.querySelector("#imgDice")
  imgDice.src = './images/dice' + result +'.png'
  /****VOIR LE NB DE TOUR****/
  if(gameRound == 0){
    players[0].tour = true
    actifPlayer = players[0]
    actifPlayer.currentScore += result
    currentScoreDivs()
    changeCssPlayer()
  }
  /*****VOIR SI RANDOM RESULT = 1 ET CHANGMENT DE JOUEUR AVEC REVERSE () (inverse ordre tableau)****/
  if(result == 1){
    winDiv.innerText = 'Perdu, joueur suivant !'
    setTimeout (() =>{
      changeCssPlayer()
      players[0].currentScore = 0
      actifPlayer.tour = false
      players.reverse()
      players[0].tour = true
      currentScoreDivs()
    }, 1000)
  }
}


/********FONCTION HOLD (récupérer les points du current jusqu'au global et changer de joueur)*****/
function hold(){
  players[0].globalScore += players[0].currentScore
  players[0].currentScore = 0
  players[0].tour = false
  if(players[0].globalScore >= 100){
    players[0].win = true
    Confetti.launchAnimationConfeti()
    if(players[0] == playerOne){
      winDiv.textContent = `Joueur ${namePlayerOne} gagne !`
    }
    if(players[0] == playerTwo){
      winDiv.textContent = `Joueur ${namePlayerTwo} gagne !`
    }
  }
  setTimeout(() => {
    currentScoreDivs()
    players.reverse()
    players[0].tour = true
    globalScoreHtml()
    changeCssPlayer()

  }, 1500)
}

/*****SCORE EN CURRENT EN HTML******/
function currentScoreDivs(){
  if(actifPlayer = playerOne){
    document.getElementById("currentScorePlayerOne").textContent = actifPlayer.currentScore
  }
  if(actifPlayer = playerTwo){
    document.getElementById("currentScorePlayerTwo").textContent = actifPlayer.currentScore
  }
}

/******SCORE EN GLOBAL EN HTML********/
function globalScoreHtml(){
  if(actifPlayer = playerOne){
    document.getElementById("globalScorePlayerOne").textContent = actifPlayer.globalScore
  }
  if(actifPlayer = playerTwo){
    document.getElementById("globalScorePlayerTwo").textContent = actifPlayer.globalScore
  }
}

/******CHANGEMENT STYLE EN FONCTION DU JOUEUR******/
function changeCssPlayer(){
  if(players[0] == playerOne){
    divPlayerOne.style.backgroundColor = "rgb(195, 195, 195)"
    divPlayerTwo.style.backgroundColor = "white"
    nameOnePara.style.textDecoration = "underline"
    nameTwoPara.style.textDecoration = "none"
    nameOnePara.style.color = "green"
    nameTwoPara.style.color = "black"
  }
  if(players[0] == playerTwo){
    divPlayerTwo.style.backgroundColor = "rgb(195, 195, 195)"
    divPlayerOne.style.backgroundColor = "white"
    nameOnePara.style.textDecoration = "none"
    nameTwoPara.style.textDecoration = "underline"
    nameTwoPara.style.color = "green"
    nameOnePara.style.color = "black"
  }
}