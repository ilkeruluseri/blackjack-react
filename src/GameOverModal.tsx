import React from 'react';
import './App.css'

function GameOverModal({ winner, scores, onReset }) {
  return (
    <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50">
      <div className="bg-gray-700 text-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
        <h2 className="text-3xl mb-2 font-semibold">Winner: {winner}</h2>
        <div className="my-10 text-xl">
          <p>Player1 Score: {scores.player1}</p>
          <p>Player2 Score: {scores.player2}</p>
          <p>Dealer Score: {scores.dealer}</p>
        </div>
        <button
          className="btn-red"
          onClick={onReset}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;