let namePlayerOne = prompt('Nom du joueur :')
let namePlayerTwo = prompt('Nom du joueur :')
let actifPlayer

class Player {
  constructor(name, globalScore, currentScore, bgColor){
    this.nam = name
    this.globalScore = globalScore
    this.currentScore = currentScore
  }
}

const playerOne = new Player(namePlayerOne, 0, 0)
const playerTwo = new Player(namePlayerTwo, 0, 0)

document.getElementById("namePlayerOne").innerText = namePlayerOne
document.getElementById("namePlayerTwo").innerText = namePlayerTwo

document.querySelector('.rollDiceDiv').addEventListener("click", () =>{
  rollDice()
})

document.querySelector(".holdDiv").addEventListener("click", () => {
  hold()
})

function rollDice(){
  rollDicePlayerOne()
}

function rollDicePlayerOne(){
  actifPlayer = playerOne
  let currentScorePlayerOneDiv = document.getElementById("currentScorePlayerOne")
  playerOne.globalScore = playerOne.globalScore
  const randomDice = Math.floor(Math.random() * 6 + 1)
  const result = randomDice
  console.log(result)
  const imgDice = document.querySelector("#imgDice")
  imgDice.src = './images/dice' + result +'.png'
  if(result > 1){
    playerOne.currentScore += result
    currentScorePlayerOneDiv.textContent = playerOne.currentScore
  }else {
    alert("Vous avez perdu vos points !")
    playerOne.currentScore = 0
    // rollDicePlayerTwo()
  }
}



function rollDicePlayerTwo(){
  actifPlayer = playerTwo
  let currentScorePlayerTwoDiv = document.getElementById("currentScorePlayerTwo")
  playerTwo.globalScore = playerTwo.globalScore
  const randomDice = Math.floor(Math.random() * 6 + 1)
  const result = randomDice
  console.log(result)
  const imgDice = document.querySelector("#imgDice")
  imgDice.src = './images/dice' + result +'.png'
  if(result > 1){
    playerTwo.currentScore += result
    currentScorePlayerTwoDiv.textContent = playerTwo.currentScore
  }else {
    playerTwo.currentScore = 0
    rollDicePlayerOne()
  }
}

