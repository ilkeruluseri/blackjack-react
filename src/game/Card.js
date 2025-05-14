export class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    getValue(currentValue = 1) {
        if (this.rank === 'A') {
            return currentValue + 11 <= 21 ? 11 : 1; // 11 if it doesn't exceed 21, otherwise 1
        } else if (this.rank === 'K' || this.rank === 'Q' || this.rank === 'J') {
            return 10;
        } else {
            return parseInt(this.rank, 10); // Convert rank to integer
        }
    }

    toString() {
        return `${this.rank}${this.suit}`;
      }
}