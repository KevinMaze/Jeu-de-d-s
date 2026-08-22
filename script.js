import { Confetti} from './lib/confetti.js'

/**ELEMENTS DU DOM**/
const setupOverlay = document.getElementById("setupOverlay")
const inputPlayerOne = document.getElementById("inputPlayerOne")
const inputPlayerTwo = document.getElementById("inputPlayerTwo")
const startGameBtn = document.getElementById("startGame")

const rulesOverlay = document.getElementById("rulesOverlay")
const rulesBtn = document.getElementById("rulesBtn")
const closeRulesBtn = document.getElementById("closeRules")

const app = document.getElementById("app")
const newGameBtn = document.getElementById("newGame")
const rollBtn = document.getElementById("rollBtn")
const holdBtn = document.getElementById("holdBtn")
const imgDice = document.getElementById("imgDice")
const winDiv = document.getElementById("win")

const cardPlayerOne = document.getElementById("cardPlayerOne")
const cardPlayerTwo = document.getElementById("cardPlayerTwo")
const namePlayerOneEl = document.getElementById("namePlayerOne")
const namePlayerTwoEl = document.getElementById("namePlayerTwo")

// Empeche les doubles clics pendant les délais d'animation (changement de joueur), qui faussaient le score
let isLocked = false
// Passe à true dès qu'un joueur atteint 100 : bloque roll/hold pour arrêter la partie
let gameOver = false

// Désactive visuellement roll/hold pendant les délais : sans ça, un clic pendant
// la transition ne faisait rien (le dé restait affiché sur 1) puis le changement
// de joueur programmé arrivait tout seul juste après, ce qui semblait être un bug
function setControlsLocked(locked){
  rollBtn.disabled = locked
  holdBtn.disabled = locked
}

// Evite l'icone d'image cassée avant le premier lancer
imgDice.src = './images/dés.png'

/***CLASSE JOUEUR***/
class Player {
  constructor(name){
    this.name = name
    this.globalScore = 0
    this.currentScore = 0
  }
}

let playerOne
let playerTwo
// players[0] est toujours le joueur actif : changer de tour = inverser ce tableau
let players

/****DEMARRAGE : les noms viennent du formulaire, plus de prompt()****/
startGameBtn.addEventListener("click", startGame)
inputPlayerTwo.addEventListener("keydown", (e) => {
  if(e.key === "Enter") startGame()
})

function startGame(){
  const nameOne = inputPlayerOne.value.trim() || "Joueur 1"
  const nameTwo = inputPlayerTwo.value.trim() || "Joueur 2"

  playerOne = new Player(nameOne)
  playerTwo = new Player(nameTwo)
  players = [playerOne, playerTwo]

  namePlayerOneEl.textContent = playerOne.name
  namePlayerTwoEl.textContent = playerTwo.name

  currentScoreDivs()
  globalScoreHtml()
  changeCssPlayer()

  setupOverlay.classList.add("hidden")
  app.classList.remove("hidden")
}

/****REGLES (pop-in, n'affecte jamais la mise en page du jeu)****/
rulesBtn.addEventListener("click", () => rulesOverlay.classList.remove("hidden"))
closeRulesBtn.addEventListener("click", () => rulesOverlay.classList.add("hidden"))

/****NOUVELLE PARTIE****/
newGameBtn.addEventListener("click", () => {
  location.reload();
})

rollBtn.addEventListener("click", () =>{
  rollDice()
})

holdBtn.addEventListener("click", () => {
  hold()
})

/********FONCTION ROLL DICE (nb aléa et changement de joueur)********/
function rollDice(){
  if(isLocked || gameOver) return

  winDiv.innerText = ''
  const result = Math.floor(Math.random() * 6 + 1)
  imgDice.src = './images/dice' + result + '.png'

  if(result == 1){
    // Un 1 fait perdre le tour : on ne doit PAS ajouter le résultat au score avant de le remettre à 0
    winDiv.innerText = 'Perdu, joueur suivant !'
    isLocked = true
    setControlsLocked(true)
    setTimeout(() => {
      players[0].currentScore = 0
      currentScoreDivs()
      players.reverse()
      changeCssPlayer()
      isLocked = false
      setControlsLocked(false)
    }, 1000)
  } else {
    players[0].currentScore += result
    currentScoreDivs()
  }
}

/********FONCTION HOLD (récupérer les points du current jusqu'au global et changer de joueur)*****/
function hold(){
  if(isLocked || gameOver) return

  players[0].globalScore += players[0].currentScore
  players[0].currentScore = 0
  globalScoreHtml()
  currentScoreDivs()

  if(players[0].globalScore >= 100){
    // La partie s'arrête ici : plus de changement de joueur, roll/hold restent bloqués
    gameOver = true
    setControlsLocked(true)
    Confetti.launchAnimationConfeti()
    winDiv.textContent = `Joueur ${players[0].name} gagne !`
    return
  }

  isLocked = true
  setControlsLocked(true)
  setTimeout(() => {
    players.reverse()
    changeCssPlayer()
    isLocked = false
    setControlsLocked(false)
  }, 1500)
}

/*****SCORE EN CURRENT EN HTML******/
function currentScoreDivs(){
  document.getElementById("currentScorePlayerOne").textContent = playerOne.currentScore
  document.getElementById("currentScorePlayerTwo").textContent = playerTwo.currentScore
}

/******SCORE EN GLOBAL EN HTML********/
function globalScoreHtml(){
  document.getElementById("globalScorePlayerOne").textContent = playerOne.globalScore
  document.getElementById("globalScorePlayerTwo").textContent = playerTwo.globalScore
}

/******MISE EN AVANT DU JOUEUR ACTIF (via une classe CSS plutôt que du style inline)******/
function changeCssPlayer(){
  const isPlayerOneActive = players[0] === playerOne
  cardPlayerOne.classList.toggle("active", isPlayerOneActive)
  cardPlayerTwo.classList.toggle("active", !isPlayerOneActive)
}
