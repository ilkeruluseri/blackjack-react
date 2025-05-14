import { useState, useEffect } from 'react'
import { Deck } from "./game/Deck.js";
import './App.css'

function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const deck = new Deck(1); // Create a new deck with 1 standard deck
    console.log(deck.toString()); // Log the deck to the console
    setDeck(deck); // Set the deck in state

    setPlayerHand([deck.drawCard(), deck.drawCard()]);
    setDealerHand([deck.drawCard(), deck.drawCard()]);
  }, []);

  return (
    <>
      <div>
        <h2>Player Hand: {playerHand.map(card => card.toString()).join(', ')},
           Value: {
           playerHand.length === 2
           ? playerHand[0].getValue() +
             playerHand[1].getValue()
           : 'N/A'
           }
        </h2>
        <h2>Dealer Hand: {dealerHand.map(card => card.toString()).join(', ')},
           Value: {
            dealerHand.length === 2
            ? dealerHand[0].getValue() +
              dealerHand[1].getValue()
            : 'N/A'
           }   
        </h2>
        <h2>The cards left: <br/>
          {deck.toString()}
        </h2>
      </div>
    </>
  )
}

export default App
