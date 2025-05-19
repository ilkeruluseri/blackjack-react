import React from 'react';
import './App.css'

function GameOverModal({ winner, scores, onReset }) {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]); // [ [player, score], ... ]

    return (
        <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-50">
        <div className="bg-gray-700 text-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-4xl font-bold mb-4 text-red-500">Game Over!</h2>
            <h2 className="text-3xl mb-2 font-semibold text-green-500">Winner: {winner}</h2>
            <div className="my-10 text-xl space-y-2">
            {sortedScores.map(([player, score]) => (
                <p key={player}>
                {player.charAt(0).toUpperCase() + player.slice(1)} Score: {score}
                </p>
            ))}
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