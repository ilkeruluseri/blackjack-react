import { useState, useEffect } from 'react'
import { Deck } from "./game/Deck.js";
import { Game } from "./game/Game.js";
import GameOverModal from './GameOverModal.jsx';
import './App.css'


function App() {
  const [game, SetGame] = useState(null);

  useEffect(() => {
    const newGame = new Game();
    newGame.startGame(4);
    SetGame(newGame); // remember to call setGame to update the state
  }, []);

  useEffect(() => {
    console.log("Game before set:", game); // will log null first
  }, [game]);
  

  function NextRoundButton() {
    if (game.roundOver) {
      return (
        <div>
        <h2 className="text-4xl font-semibold mb-2 text-center">{game.roundWinner} takes the round!</h2> 
          <button className="btn-next-round text-4xl mt-5" onClick={() => {
            game.nextRound();
            SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
          }
          }>Next Round</button>
        </div>
      );
    }
    return null;
    }

  if (!game) {
    return <h2>Loading game...</h2>;
  }

  return (
    <>
    <div className="bg-gray-700 text-white min-h-screen flex flex-col items-center pt-10">
      {/* Header */}
      <div className="text-center mt-4 mb-5">
        <h1 className="text-7xl font-bold mb-6">Blackjack</h1>
      </div>
  
      {/* Round and Scores Box */}
      <div className="flex justify-center items-center gap-10 bg-gray-800 p-8 rounded-xl shadow-md max-w-4xl mx-auto mb-6">
        <div className="text-3xl font-semibold">Round: {game.round}</div>
        <div className="text-xl space-y-1">
          <h2>Player1 Score: {game.player1Score}</h2>
          <h2>Player2 Score: {game.player2Score}</h2>
          <h2>Dealer Score: {game.dealerScore}</h2>
        </div>
      </div>
  
      {/* Hands Section */}
      <div className="flex justify-center gap-6 bg-gray-800 px-10 py-20 rounded-xl shadow-md max-w-6xl mx-auto">
        {/* Player 1 */}
        <div className="flex flex-col items-center">
          {game.player1Hand && game.player1Hand.length > 0 ? (
            <h2 className="text-lg font-semibold mb-2 text-center">
              Player1 Hand:<br />
              {game.player1Hand.filter(card => card).map(card => card.toString()).join(', ')}<br />
              Value: {game.calculateHandValue(game.player1Hand)}
            </h2>
            ) : (
            <h2 className="text-lg font-semibold mb-2 text-center">
              Hand is empty.
            </h2>)
          }
          <div className="space-x-2 mt-2">
            <button 
              className={`${(game.playersDone[0] || game.playersBust[0]) ? 'btn-blue-disabled' : 'btn-blue'}`}
              disabled={game.playersDone[0] || game.playersBust[0]}
              onClick={() => {
                game.hit(0);
                SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
              }}
            >
              Player1 Hit
            </button>
            <button 
              className={`${game.playersDone[0] || game.playersBust[0] ? 'btn-green-disabled' : 'btn-green'}`}
              disabled={game.playersDone[0] || game.playersBust[0]}
              onClick={() => {
                game.stand(0);
                SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
              }}
            >
              Player1 Stand
            </button>
          </div>
        </div>
  
        {/* Player 2 */}
        <div className="flex flex-col items-center">
          {game.player2Hand && game.player2Hand.length > 0 ? (
            <h2 className="text-lg font-semibold mb-2 text-center">
              Player2 Hand:<br />
              {game.player2Hand.filter(card => card).map(card => card.toString()).join(', ')}<br />
              Value: {game.calculateHandValue(game.player2Hand)}
            </h2>
            ) : (
            <h2 className="text-lg font-semibold mb-2 text-center">
              Hand is empty.
            </h2>)
          }
          <div className="space-x-2 mt-2">
            <button 
              className={`${game.playersDone[1] || game.playersBust[1] ? 'btn-blue-disabled' : 'btn-blue'}`}
              disabled={game.playersDone[1] || game.playersBust[1]}
              onClick={() => {
                game.hit(1);
                SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
              }}
            >
              Player2 Hit
            </button>
            <button 
              className={`${game.playersDone[1] || game.playersBust[1] ? 'btn-green-disabled' : 'btn-green'}`}
              disabled={game.playersDone[1] || game.playersBust[1]}
              onClick={() => {
                game.stand(1);
                SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
              }}
            >
              Player2 Stand
            </button>
          </div>
        </div>
  
        {/* Dealer */}
        <div className="flex flex-col items-center">
          {game.dealerHand && game.dealerHand.length > 0 ? (
            <h2 className="text-lg font-semibold mb-2 text-center">
              Dealer Hand:<br />
              {game.dealerHand.filter(card => card).map(card => card.toString()).join(', ')}<br />
              Value: {game.calculateHandValue(game.dealerHand)}
            </h2>
            ) : (
            <h2 className="text-lg font-semibold mb-2 text-center">
              Hand is empty.
            </h2>)
          }
        </div>
      </div>
  
      {/* Deck & Next Round */}
      <div className="text-center mt-6 space-y-4">
        <NextRoundButton />
        { /* game.deck.cards.length > 0 ? (
          <h2 className="text-lg">The cards left:<br />{game.deck.toString()}</h2>) : (
          <h2 className="text-lg">No cards left in the deck.</h2>)
        */}
      </div>
    </div>

    {game.gameOver && (
      <GameOverModal
        winner = {game.getGameWinner()}
        scores = {{player1: game.player1Score, player2: game.player2Score, dealer: game.dealerScore}}
        onReset = {() => {
          game.resetGame();
          game.startGame(4);
          SetGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game));
        }
        }
      />
    )}
    </>
  );  
}

export default App
