import React, { Component } from 'react';

import GameStore from '../stores/GameStore';

import styles from './Game.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            bets: GameStore.getBets()
        }
    }

    componentWillMount() {
        GameStore.on("betsUpdate", () => { this.setState({ bets: GameStore.getBets() }) })
    }

    optionClicked(type, val, id) {
        this.props.optionClicked(type, val, id)
    }

    printDeleteButton(id) {
        if (this.state.bets[id]) {
            return <button onClick={(e) => {
                e.stopPropagation()
                this.deleteBetClicked(id)
            }}>X</button>
        }
        else { return null }
    }

    printBid(id) {
        if (this.state.bets[id]) {
            return "Bid: " + this.state.bets[id].bid
        }
        else {
            return ""
        }
    }

    printClass(id) {
        if (this.state.bets[id]) {
            return styles.betOption
        }
        else {
            return ""
        }
    }

    deleteBetClicked(id) {
        this.props.deleteBet(id)
    }

    render() {

        return (
            <div className={styles.board}>
                
                <div className={`${styles.numbers} ${styles.boardColumn}`}>
                    {GameStore.getNumbers().map((item, key) => {
                        let title = this.printBid(item.id)
                        let attr = { 'title': title }
                        return <div className={`${styles[item.color]} ${styles.number} ${styles.option} ${this.printClass(item.id)}`} {...attr} onClick={() => { this.optionClicked('number', item.id, item.id) }}>
                            {item.id}
                        </div>
                    })}
                    
                </div>
               
            </div>
        );
    }

}

export default Board;
