export class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    getValue() {
        if (this.rank === 'A') return 11;
        if (['K', 'Q', 'J'].includes(this.rank)) return 10;
        return parseInt(this.rank, 10);
    }

    toString() {
        return `${this.rank}${this.suit}`;
      }
}