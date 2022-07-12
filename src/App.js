import React, {useState} from "react"
import './App.css';
import Dice from "./components/Dice"

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let diceArray = Array.from({ length: 10 }, () =>
      Math.ceil(Math.random() * 6)
    );
    return diceArray;
  }

  const diceElements = dice.map((num) => <Dice value={num} />);

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
    </main>
  );
}

export default App;
