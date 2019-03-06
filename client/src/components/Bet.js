class Bet {
  constructor(type, value, bid) {
    this.type = type;
    this.value = value;
    this.bid = bid;
    this.multiplier = this.setMultiplier();
    this.setPossibleWin();
    this.win = 0;
  }

  setMultiplier() {
    let multiplier;
    switch (this.type) {
      case "number":
        multiplier = 9;
        break;

      default:
        break;
    }

    return multiplier;
  }

  setPossibleWin() {
    this.possibleWin = this.multiplier * this.bid;
  }

  raiseBid(val) {
    this.bid += val;
    this.setPossibleWin();
  }

  getWin(winningNumber) {
    let win = false;
    let number = winningNumber.id;
    let color = winningNumber.color;
    switch (this.type) {
      case "number":
        win = this.value === number ? true : false;
        break;
      case "color":
        win = this.value === color ? true : false;
        break;

      default:
        break;
    }

    if (win) {
      this.win = this.multiplier * this.bid;
    } else {
      this.win = 0;
    }
  }
} // class

export default Bet;
