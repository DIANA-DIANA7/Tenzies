import React, {useState} from "react"
import {nanoid} from "nanoid"
import './App.css';
import Dice from "./components/Dice"

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let diceObject = Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
    console.log(diceObject)
    return diceObject;
  }
  
  function rollDice(){
    setDice(allNewDice())
  }

  const diceElements = dice.map((dice) =>(<Dice key={dice.id} value={dice.value}  isHeld={dice.isHeld}/>));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="dice-btn" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
