import { useState, useEffect } from 'react'
import { Deck } from "./game/Deck.js";
import { Game } from "./game/Game.js";
import './App.css'


function App() {
  const [game, SetGame] = useState(null);

  useEffect(() => {
    const newGame = new Game();
    newGame.startGame(1);
    SetGame(newGame); // remember to call setGame to update the state
  }, []);

  useEffect(() => {
    console.log("Game before set:", game); // will log null first
  }, [game]);
  

  function NextRoundButton() {
    if (game.roundOver) {
      return (
        <button onClick={() => {
          game.nextRound();
          SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
        }
        }>Next Round</button>
      );
    }
    return null;
    }

  if (!game) {
    return <h2>Loading game...</h2>;
  }

  return (
    <>
      <div>
        <h2>Player1 Hand: {game.player1Hand.map(card => card.toString()).join(', ')},
           Value: { game.calculateHandValue(game.player1Hand) }
        </h2>
        <button onClick={() => {
          game.hit(0);
          SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));

        }
        }>Player1 Hit</button>
        <button onClick={() => {
          game.stand(0);
          SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
 
        }
        }>Player1 Stand</button>


        <h2>Player2 Hand: {game.player2Hand.map(card => card.toString()).join(', ')},
           Value: { game.calculateHandValue(game.player2Hand) }
        </h2>
        <button onClick={() => {
          game.hit(1);
          SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
 
        }
        }>Player2 Hit</button>
        <button onClick={() => {
          game.stand(1);
          SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
 
        }
        }>Player2 Stand</button>
        <h2>Dealer Hand: {game.dealerHand.map(card => card.toString()).join(', ')},
           Value: { game.calculateHandValue(game.dealerHand) }
        </h2>
        <NextRoundButton />
        <h2>The cards left: <br/>
          {game.deck.toString()}
        </h2>
      </div>
    </>
  )
}

export default App
