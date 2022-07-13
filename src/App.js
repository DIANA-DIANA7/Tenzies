import React, {useState} from "react"
import {nanoid} from "nanoid"
import './App.css';
import Dice from "./components/Dice"

function App() {
  const [dice, setDice] = useState(allNewDice());

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
    setDice(oldDice=>oldDice.map(die=>{
      return die.isHeld ? die : generateNewDie()
    }))
  }


  function holdDice(id){
    setDice(oldDice=>oldDice.map(die=>{
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="dice-btn" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
