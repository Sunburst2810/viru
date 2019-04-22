import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GameStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.numbers = [
      { color: "green", id: 0 },
      { color: "red", id: 1 },
      { color: "black", id: 2 },
      { color: "red", id: 3 },
      { color: "black", id: 4 },
      { color: "red", id: 5 },
      { color: "black", id: 6 },
      { color: "red", id: 7 },
      { color: "black", id: 8 },
      { color: "red", id: 9 }
    ];
    this.bets = [];
    this.money = 1000;
    this.totalBet = 0;
    this.token = 5;
    this.previusBets = null;
    this.previousBid = null;
    this.deletingBets = false;
  }

 
  getNumbers() {
    return this.numbers;
  }
  getBets() {
    return this.bets;
  }
  getMoney() {
    return this.money;
  }
  getTotalBet() {
    return this.totalBet;
  }
  getToken() {
    return this.token;
  }
  getPreviousBets() {
    return this.previusBets;
  }
  getPreviousBid() {
    return this.previousBid;
  }

  updateBets(bets, money) {
    this.bets = bets;
    this.emit("betsUpdate");
    this.updateMoney(-money);
    this.updateBid(money);
  }

  updateMoney(x) {
    this.money += x;
    this.emit("moneyUpdate");
  }

  updateBid(x) {
    this.totalBet += x;
    this.emit("totalBetUpdate");
  }

  deleteAllBets() {
    this.updateBets([], -this.totalBet);
  }

  newGame() {
    this.previusBets = this.bets;
    this.previousBid = this.totalBet;
    this.bets = [];
    this.totalBet = 0;
    this.emit("betsUpdate");
    this.emit("totalBetUpdate");
    this.emit("newGame");
  }

  handleActions(action) {
    switch (action.type) {
      case "UPDATE_BETS":
        this.updateBets(action.bets, action.money);
        break;
      case "DELETE_ALL_BETS":
        this.deleteAllBets();
        break;
      case "START_GAME":
        this.emit("startGame");
        break;
      case "START_NEW_GAME":
        this.newGame();
        break;
      case "TOKEN_CLICKED":
        this.token = action.val;
        this.emit("tokenUpdate");
        break;
      default:
        break;
    }
  }
}

const gameStore = new GameStore();
dispatcher.register(gameStore.handleActions.bind(gameStore));

export default gameStore;
