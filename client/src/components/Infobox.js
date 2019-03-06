import React, { Component } from "react";

import GameStore from "../stores/GameStore";

import styles from "./Game.css";

class Infobox extends Component {
  constructor() {
    super();
    this.state = {
      money: GameStore.getMoney(),
      totalBet: GameStore.getTotalBet(),
      bets: GameStore.getBets(),
      lastWinningNumbers: [],
      tableOpen: false
    };
  }

  componentWillMount() {
    GameStore.on("moneyUpdate", () => {
      this.setState({ money: GameStore.getMoney() });
    });
    GameStore.on("totalBetUpdate", () => {
      this.setState({ totalBet: GameStore.getTotalBet() });
    });
    GameStore.on("betsUpdate", () => {
      this.setState({ bets: GameStore.getBets() });
    });
  }

  deleteBetClicked(id) {
    this.props.deleteBet(id);
  }

  addWinningNumber(number, color) {
    let lastWinningNumbers = this.state.lastWinningNumbers;
    lastWinningNumbers.unshift({ number: number, color: color });
    lastWinningNumbers = lastWinningNumbers.slice(0, 8);
    this.setState({ lastWinningNumbers });
  }

  betsTableOpenerClicked() {
    let tableOpen = this.state.tableOpen ? false : true;
    this.setState({ tableOpen });
  }

  render() {
    let tableOpen = this.state.tableOpen ? styles.open : "";
    let buttonOpen = this.state.tableOpen ? styles.openBtn : "";
    return (
      <div className={styles.infobox}>
        <div className={styles.container}>
          <div className={styles.mainInfo}>
            <div className={styles.moneyInfo}>
              <p>
                <b>Balance:</b> {this.state.money}
              </p>
              <p>
                <b>Total bet:</b> {this.state.totalBet}
              </p>
            </div>
            <button
              className={`${styles.betsTableOpener} ${styles.defaultBtn}`}
              onClick={() => {
                this.betsTableOpenerClicked();
              }}
            >
              Your Bets{" "}
              <i className={`${buttonOpen} material-icons`}>
                keyboard_arrow_down
              </i>
            </button>
          </div>
          <div className={styles.winningNumbersBox}>
            {this.state.lastWinningNumbers.map((item, id) => {
              return (
                <div
                  className={`${styles[item.color]} ${styles.winningNumber}`}
                >
                  {item.number}
                </div>
              );
            })}
          </div>
        </div>
        <table className={`${styles.infoboxTable} ${tableOpen}`}>
          <thead>
            <tr>
              <th>Bet</th>
              <th>Bid</th>
              <th>Possible win</th>
              <th>Delete bid</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bets.map((bet, id) => {
              if (bet) {
                return (
                  <tr>
                    <td>{bet.value}</td>
                    <td>{bet.bid}</td>
                    <td>{bet.possibleWin}</td>
                    <td>
                      <button onClick={() => this.deleteBetClicked(id)}>
                        <i className="material-icons">clear</i>
                      </button>
                    </td>
                  </tr>
                );
              }
              return "";
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Infobox;
