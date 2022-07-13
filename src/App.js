import React, {useState,useEffect} from "react"
import {nanoid} from "nanoid"
import './App.css';
import Dice from "./components/Dice"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies]=useState(false)

useEffect(()=>{
  const allHeld=dice.every(die=>die.isHeld)
  const firstValue=dice[0].value
  const allSameValue=dice.every(die =>die.value===firstValue)
  if(allHeld && allSameValue){setTenzies(true)}
},[dice])

  function generateNewDie(){
  return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let newDice = Array.from({ length: 10 }, () => (generateNewDie()));
    
    return newDice;
  }
  
  function rollDice(){
    if(!tenzies){
    setDice(oldDice=>oldDice.map(die=>{
      return die.isHeld ? die : generateNewDie()
    }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
    setDice(oldDice=>oldDice.map(die=>{
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        {tenzies ? "🎉You Won🎉" : "Roll until all dice are the same. Click each die to hold it between rolls"}
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="dice-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
