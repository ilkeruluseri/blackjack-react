import { Deck } from './Deck.js';
import { Card } from './Card.js';


export class Game {
    constructor() {
        this.deck = null;
        this.player1Hand = []; 
        this.player2Hand = []; 
        this.dealerHand = []; 
        this.gameOver = false; 
        this.player1Score = 0;
        this.player2Score = 0;
        this.dealerScore = 0; 
        this.playersDone = [false, false, false]; // Track if players are done, 0: player1, 1: player2, 2: dealer
        this.playersBust = [false, false, false]; // Track if players are bust
        this.round = 1; // Track the current round
        this.roundOver = false; // Track if the round is over
    }

    startGame(numOfDecks = 1) {
        this.deck = new Deck(numOfDecks); // Create a new deck with the specified number of standard decks
        this.deck.shuffle();
        this.dealInitialCards(); // Deal initial cards to players and dealer
    }

    dealInitialCards() {
        this.player1Hand = []; // Reset player hands
        this.player2Hand = [];
        this.dealerHand = [];
        this.player1Hand.push(this.deck.drawCard(), this.deck.drawCard());
        this.player2Hand.push(this.deck.drawCard(), this.deck.drawCard());
        this.dealerHand.push(this.deck.drawCard(), this.deck.drawCard());
    }

    calculateHandValue(hand) {
        let value = 0;
        let aceCount = 0;
    
        for (const card of hand) {
            let cardValue = card.getValue();
            value += cardValue;
            if (card.rank === 'A') aceCount += 1;
        }
    
        // Adjust Aces from 11 to 1 if necessary
        while (value > 21 && aceCount > 0) {
            value -= 10; // Convert an Ace from 11 to 1
            aceCount -= 1;
        }
    
        return value;
    }
    

    hit(player) {
        if (this.gameOver) {
            console.warn('Game is over! Cannot hit.');
            return;
        }
        let playerHand = [];
        switch (player) {
            case 0:
                playerHand = this.player1Hand;
                break;
            case 1:
                playerHand = this.player2Hand;
                break;
            case 2:
                playerHand = this.dealerHand;
                break;
            default:
                console.warn('Invalid player index!');
                return;
        }
        if (this.playersDone[player] || this.playersBust[player]) {
            console.warn('Player has already stood/bust! Cannot hit.');
            return;
        }
        const newCard = this.deck.drawCard();
        if (newCard) {
            playerHand.push(newCard);
        } else {
            console.warn('No cards left in the deck!');
        }
        this.calculateGameState();
    }

    stand(player) {
        if (this.gameOver) {
            console.warn('Game is over! Cannot stand.');
            return;
        }
        if (this.playersDone[player] || this.playersBust[player]) {
            console.warn('Player has already stood/bust!');
            return;
        }
        this.playersDone[player] = true; // Mark the player as done
        this.calculateGameState(); // Check game state after standing
    }

    // call this after every action
    calculateGameState() {
        let player1HandValue = this.calculateHandValue(this.player1Hand);
        let player2HandValue = this.calculateHandValue(this.player2Hand);
        let dealerHandValue = this.calculateHandValue(this.dealerHand);

        // Check for bust
        if (player1HandValue > 21) {
            this.playersBust[0] = true; // Player 1 is bust
        }
        if (player2HandValue > 21) {
            this.playersBust[1] = true; // Player 2 is bust
        }
        if (dealerHandValue > 21) {
            this.playersBust[2] = true; // Dealer is bust
        }

        if (this.playersBust[0] && this.playersBust[1] && !this.playersBust[2]) {
            this.dealerScore += 1; // Dealer wins
            console.log('Dealer wins!');
            this.endRound();
        }

        if (this.deck.cardsLeft() === 0) {
            this.gameOver = true; // No cards left, game over
        }


        if ((this.playersDone[0] || this.playersBust[0]) && (this.playersDone[1] || this.playersBust[1])) { // Both players are done/bust
            this.roundEnding(); // End the round
            this.endRound(); // Move to the next round
        }
        
    }

    endRound() {
        this.roundOver = true; // Mark the round as over
    }

    nextRound() {
        this.round += 1;
        this.roundOver = false; // Reset round over status
        this.playersDone = [false, false, false]; // Reset players' done status
        this.playersBust = [false, false, false]; // Reset players' bust status
        this.dealInitialCards(); // Deal new cards to players and dealer
    }


    dealerPlay() {
        while (this.calculateHandValue(this.dealerHand) < 17) {
            const newCard = this.deck.drawCard();
            if (newCard) {
                this.dealerHand.push(newCard);
            } else {
                console.warn('No cards left in the deck!');
                break;
            }
        }
        // Check if dealer busted
        if (this.calculateHandValue(this.dealerHand) > 21) {
            this.playersBust[2] = true; // Dealer is bust
            console.log('Dealer busted!');
        }
    }
    

    roundEnding() {
        this.dealerPlay(); // Dealer plays
        // At this point, all players are done, dealer has played and may have busted

        let player1HandValue = this.calculateHandValue(this.player1Hand);
        let player2HandValue = this.calculateHandValue(this.player2Hand);
        let dealerHandValue = this.calculateHandValue(this.dealerHand);

        // Calculate winner
        if (!this.playersBust[0] && !this.playersBust[1] && !this.playersBust[2]) { // no one has busted
            if (player1HandValue > player2HandValue && player1HandValue > dealerHandValue) {
                this.player1Score += 1; // Player 1 wins
                console.log('Player 1 wins!');
            } else if (player2HandValue > player1HandValue && player2HandValue > dealerHandValue) {
                this.player2Score += 1; // Player 2 wins
                console.log('Player 2 wins!');
            } else if (dealerHandValue > player1HandValue && dealerHandValue > player2HandValue) {
                this.dealerScore += 1; // Dealer wins
                console.log('Dealer wins!');
            } else { // Scores tied
                if (player1HandValue === player2HandValue && player1HandValue === dealerHandValue) {
                    if (this.player1Hand.length < this.player2Hand.length && this.player1Hand.length < this.dealerHand.length) {
                        this.player1Score += 1; // Player 1 wins
                        console.log('Player 1 wins!');
                    } else if (this.player2Hand.length < this.player1Hand.length && this.player2Hand.length < this.dealerHand.length) {
                        this.player2Score += 1; // Player 2 wins
                        console.log('Player 2 wins!');
                    } else { //player 1 and player 2 have the same number of cards
                        this.dealerScore += 1; // Dealer wins
                        console.log('Dealer wins!');
                    }
                }
                else if (player1HandValue === player2HandValue) {
                    if (this.player1Hand.length < this.player2Hand.length) {
                        this.player1Score += 1; // Player 1 wins
                        console.log('Player 1 wins!');
                    } else if (this.player2Hand.length < this.player1Hand.length) {
                        this.player2Score += 1; // Player 2 wins
                        console.log('Player 2 wins!');
                    } else { //player 1 and player 2 have the same number of cards
                        this.dealerScore += 1; // Dealer wins
                        console.log('Dealer wins!');
                    }
                } else if (player1HandValue === dealerHandValue) {
                    if (this.player1Hand.length < this.dealerHand.length) {
                        this.player1Score += 1; // Player 1 wins
                        console.log('Player 1 wins!');
                    } else if (this.dealerHand.length < this.player1Hand.length) {
                        this.dealerScore += 1; // Dealer wins
                        console.log('Dealer wins!');
                    } else { //player 1 and dealer have the same number of cards
                        this.player2Score += 1; // Player 2 wins
                        console.log('Player 2 wins!');
                    }
                } else if (player2HandValue === dealerHandValue) {
                    if (this.player2Hand.length < this.dealerHand.length) {
                        this.player2Score += 1; // Player 2 wins
                        console.log('Player 2 wins!');
                    } else if (this.dealerHand.length < this.player2Hand.length) {
                        this.dealerScore += 1; // Dealer wins
                        console.log('Dealer wins!');
                    } else { //player 2 and dealer have the same number of cards
                        this.player1Score += 1; // Player 1 wins
                        console.log('Player 1 wins!');
                    }
                }
            }
        } else if (this.playersBust[0] && !this.playersBust[1] && this.playersBust[2]) { // Only Player 1 is bust
            if (player2HandValue > dealerHandValue) {
                this.player2Score += 1; // Player 2 wins
                console.log('Player 2 wins!');
            } else if (dealerHandValue > player2HandValue) {
                this.dealerScore += 1; // Dealer wins
                console.log('Dealer wins!');
            } else { // Scores tied
                if (this.player2Hand.length < this.dealerHand.length) {
                    this.player2Score += 1; // Player 2 wins
                    console.log('Player 2 wins!');
                } else { //player 2 and dealer have the same number of cards
                    this.dealerScore += 1; // Player 1 wins
                    console.log('Dealer wins!');
                }
            }
        } else if (!this.playersBust[0] && this.playersBust[1] && !this.playersBust[2]) { // Only Player 2 is bust
            if (player1HandValue > dealerHandValue) {
                this.player1Score += 1; // Player 1 wins
                console.log('Player 1 wins!');
            } else if (dealerHandValue > player1HandValue) {
                this.dealerScore += 1; // Dealer wins
                console.log('Dealer wins!');
            } else { // Scores tied
                if (this.player1Hand.length < this.dealerHand.length) {
                    this.player1Score += 1; // Player 1 wins
                    console.log('Player 1 wins!');
                } else { //player 1 and dealer have the same number of cards
                    this.dealerScore += 1; // Dealer wins
                    console.log('Dealer wins!');
                }
            }
        } else if (!this.playersBust[0] && !this.playersBust[1] && this.playersBust[2]) { // Only Dealer is bust
            if (player1HandValue > player2HandValue) {
                this.player1Score += 1; // Player 1 wins
                console.log('Player 1 wins!');
            } else if (player2HandValue > player1HandValue) {
                this.player2Score += 1; // Player 2 wins
                console.log('Player 2 wins!');
            } else { // Scores tied
                if (this.player1Hand.length < this.player2Hand.length) {
                    this.player1Score += 1; // Player 1 wins
                    console.log('Player 1 wins!');
                } else { //player 1 and player 2 have the same number of cards
                    this.player2Score += 1; // Player 2 wins
                    console.log('Player 2 wins!');
                }
            }
        }
    }

}