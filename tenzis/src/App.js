import './App.css';
import Button from './button'; 
import { useState } from 'react';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'



function App() {
  const [dice, setDice] = useState(allNewDice());


        function allNewDice(){
          return new Array(10)
           .fill(0)
           .map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld : false,
            id : nanoid()
          }))
        }


        function rollDice(){
          if(!gameWon){
          setDice(prev => {
            return prev.map(die => {
              return die.isHeld ? die :
              {...die , value: Math.ceil(Math.random() * 6)}
            })
          })
        }else{
          setDice(allNewDice())
        }
        }

        
       function hold(id){
         setDice(oldDice => {
           return oldDice.map(die => {
             return die.id === id ? {...die , isHeld: !die.isHeld} : 
             die
           })
         })
       }
      const gameWon = dice.every(die => die.isHeld) 
      && dice.every(die => die.value === dice[0].value)

 const diceElements = dice.map(prev => (
 <Button
  key={prev.id}
  value={prev.value}
  isheld={prev.isHeld}
  hold={()=>hold(prev.id)}
 />))

  return (
          <main>
            {gameWon && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
              {diceElements}
            </div>
            <button  className="roll-dice" onClick={rollDice}>
              {gameWon ? "New Game" : "Roll "}
              </button>
          </main>

  );
}

export default App;
