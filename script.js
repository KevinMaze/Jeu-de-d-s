/*******VARIABLE**********/
const globalScorePlayerOne = document.getElementById("globalScorePlayerOne")
const globalScorePlayerTwo = document.getElementById("globalScorePlayerTwo")
const currentScorePlayerOne = document.getElementById("currentScorePlayerOne")
const currentScorePlayerTwo = document.getElementById("currentScorePlayerTwo")

document.querySelector(".rollDiceDiv").addEventListener("click", () =>{
  rollDice()
})

/*FONCTION GENERATION ALEA*/
function rollDice(){
  const randomDice = Math.floor(Math.random() * 6 + 1)
  const result = randomDice
  const imgDice = document.querySelector("#imgDice")
  imgDice.src = './images/dice' + result +'.png'
}