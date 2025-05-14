import { Card } from './Card.js';

export class Deck {
    constructor(numOfDecks = 1) {
        this.numOfDecks = numOfDecks; // Number of decks to create
        this.cards = this.createDeck(this.numOfDecks); // Create a deck with the specified number of standard decks
        this.shuffle();
    }

    createDeck(numOfDecks = 1) {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];

        for (let i = 0; i < numOfDecks; i++) {
            for (const suit of suits) {
                for (const rank of ranks) {
                    deck.push(new Card(rank, suit));
                }
            }
        }
        return deck;
    }

    shuffle() {
        // for every card in the deck, swap it with a random card, Fisher-Yates shuffle algorithm
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard() {
        if (this.cards.length === 0) {
            console.warn('No cards left in the deck!');
            return null;
        }
        return this.cards.pop(); // Remove the last card from the deck and return it
    }

    cardsLeft() {
        return this.cards.length; // Return the number of cards left in the deck
    }

    resetDeck() {
        this.cards = this.createDeck(this.numOfDecks); // Reset the deck to a new shuffled deck
        this.shuffle();
    }
    toString() {
        return this.cards.map(card => card.toString()).join(', '); // Return a string representation of the deck
    }
}