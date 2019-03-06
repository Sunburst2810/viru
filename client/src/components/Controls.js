import React, { Component } from 'react';

import GameStore from '../stores/GameStore';
import * as Actions from '../actions/GameActions';

import styles from './Game.css';

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            token: GameStore.getToken(),
            prevoiusBetsDisabled: true,
            deletingBet: false
        };
    }

    componentWillMount() {
        GameStore.on("tokenUpdate", () => {
            this.setState({ token: GameStore.getToken() });
        });
        let prevoiusBetsDisabled;
        GameStore.on("newGame", () => {
            prevoiusBetsDisabled = GameStore.getPreviousBets() ? false : true;
            this.setState({ prevoiusBetsDisabled });
        });
    }

    startButtonClicked() {
        Actions.startGame();
    }

    deleteAllBetsClicked() {
        Actions.deleteAllBets();
    }

    previusBetsClicked() {
        this.props.playPrevoiusBets();
    }

    tokenClicked(val) {
        Actions.tokenClicked(val);
    }

    printTokenClasses(x) {
        return x === this.state.token ? styles.tokenActive : "";
    }

    render() {
        return (
            <div className={styles.controls}>
                <div className={styles.container}>
                    <div className={styles.tokensBox}>
                        <button
                            className={`${styles.token} ${this.printTokenClasses(5)}`}
                            onClick={() => {
                                this.tokenClicked(5);
                            }}
                        >
                            <p>5</p>
                        </button>
                        <button
                            className={`${styles.token} ${this.printTokenClasses(10)}`}
                            onClick={() => {
                                this.tokenClicked(10);
                            }}
                        >
                            <p>10</p>
                        </button>

                        <button
                            className={`${styles.token} ${this.printTokenClasses(50)}`}
                            onClick={() => {
                                this.tokenClicked(50);
                            }}
                        >
                            <p>50</p>
                        </button>
                        <button
                            className={`${styles.token} ${this.printTokenClasses(100)}`}
                            onClick={() => {
                                this.tokenClicked(100);
                            }}
                        >
                            <p>100</p>
                        </button>
                    </div>
                    <div className={`${styles.controlsButtons}`}>
                        <button
                            className={`${styles.defaultBtn}`}
                            onClick={() => {
                                this.deleteAllBetsClicked();
                            }}
                        >
                            Remove all bets
            </button>
                        <button
                            className={`${styles.defaultBtn}`}
                            onClick={() => {
                                this.previusBetsClicked();
                            }}
                            disabled={this.state.prevoiusBetsDisabled}
                        >
                            Play previous bets again
            </button>
                        <button
                            className={`${styles.defaultBtn} ${styles.spinBallBtn}`}
                            onClick={() => {
                                this.startButtonClicked();
                            }}
                        >
                            Spin the ball
            </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Controls;
