import React, { Component } from 'react';

import GameStore from '../stores/GameStore';
import * as Actions from '../actions/GameActions';

import styles from './Game.css';

import Board from './Board';
import Infobox from './Infobox';
import Controls from './Controls';
import EndGameWindow from './EndGameWindow';
import ErrorWindow from './ErrorWindow';

import Bet from './Bet';

class Game extends Component {

    constructor() {
        super();
        this.state = {
            numbers: GameStore.getNumbers(),
            money: GameStore.getMoney(),
            totalBet: 0,
            token: GameStore.getToken(),
            bets: [],
            endGame: false,
            win: 0,
            winningNumber: null,
            moneyError: false
        };
    }

    componentWillMount() {
        GameStore.on("startGame", () => { this.startGame() })
        GameStore.on("newGame", () => { this.setState({ endGame: false, win: 0, winningNumber: null }) })
        GameStore.on("moneyUpdate", () => { this.setState({ money: GameStore.getMoney() }) })
        GameStore.on("betsUpdate", () => { this.setState({ bets: GameStore.getBets() }) })
        GameStore.on("tokenUpdate", () => { this.setState({ token: GameStore.getToken() }) })
    }

    startGame() {
        let rand = Math.floor(Math.random() * this.state.numbers.length)
        let winningNumber = this.state.numbers[rand]
        this.getWin(winningNumber)
        this.setState({ endGame: true, winningNumber: winningNumber })
        this.refs.infobox.addWinningNumber(winningNumber.id, winningNumber.color)
    }

    getWin(winningNumber) {
        let bets = this.state.bets
        let win = 0
        for (let i = 0; i < bets.length; i++) {
            if (bets[i]) {
                bets[i].getWin(winningNumber)
                win += bets[i].win
            }
        }
        this.setState({ win })
        GameStore.updateMoney(win)
    }

    optionClicked(type, val, id) {
        if (this.state.token <= this.state.money) {
            let bets = this.state.bets
            if (!bets[id]) {
                bets[id] = new Bet(type, val, this.state.token)
            }
            else {
                bets[id].raiseBid(this.state.token)
            }
            Actions.updateBets(bets, this.state.token)
        }
        else {
            this.setState({ moneyError: true })
        }
    }

    deleteBet(id) {
        let bets = this.state.bets
        let bid = bets[id].bid
        bets[id] = null
        Actions.updateBets(bets, -bid)
    }

    playPrevoiusBets() {
        let previousBets = GameStore.getPreviousBets()
        let totalPrevoiusBet = GameStore.getPreviousBid()
        if (totalPrevoiusBet <= this.state.money + GameStore.getTotalBet()) {
            Actions.updateBets(previousBets, totalPrevoiusBet - GameStore.getTotalBet())
        }
        else {
            this.setState({ moneyError: true })
        }
    }

    deleteError() {
        this.setState({ moneyError: false })
    }

    render() {
        return (
            <div className={styles.gameContainer}>
                <Infobox deleteBet={this.deleteBet.bind(this)} ref="infobox" />
                <Board optionClicked={this.optionClicked.bind(this)} deleteBet={this.deleteBet.bind(this)} />
                <Controls playPrevoiusBets={this.playPrevoiusBets.bind(this)} />
                <EndGameWindow display={this.state.endGame} winningNumber={this.state.winningNumber} win={this.state.win} />
                <ErrorWindow display={this.state.moneyError} deleteError={this.deleteError.bind(this)} />
            </div>
        );
    }

}

export default Game;