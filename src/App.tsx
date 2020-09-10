import React from 'react';
import Board from './components/Board-Square';
import styles from './index.module.css';

interface GameState {
  squares: ('O' | 'X' | null)[];
  xIsNext: boolean;
  Xcount: number;
  Ocount: number;
  Winner: ('O' | 'X' | 'Draw' | null);
  isGiveUp: boolean;
}

interface TypeDispach {
  handleClick: (index: number) => void;
  setRestart: () => void;
  PassTurn: () => void;
  GiveUp: () => void;
}

type ChildProps = GameState & TypeDispach;

export class Game extends React.Component<ChildProps> {

  componentDidMount() {
    this.props.setRestart();
    
  }

  render() {
    const squares = {...this.props.squares};
    let status;
    status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    let winner;
    winner = this.props.Winner === null ? ' ' : 'WINNER => '+this.props.Winner;

    let restart;
    restart = this.props.Winner === null ? ' ' : <button type="button" className={styles.btn} onClick={()=>this.props.setRestart()}> Restart </button>;
    let pass;
    pass = this.props.Winner === null ? <button type="button" className={styles.btn} onClick={()=>this.props.PassTurn()}> Pass </button>: ' ';
    let give;
    give = this.props.Winner === null ? <button type="button" className={styles.btn} onClick={()=>this.props.GiveUp()}> Give Up </button>: ' ';

    return (
      <React.Fragment>
        <header>
          <p className={styles.headerP}>
            Othello to study <span className={styles.under_line}>React</span> and <span className={styles.under_line}>Redux</span> with <span className={styles.under_line}>TypeScript</span>
          </p>      
        </header>
        <div className={styles.game}>
          <div className={styles.game_board}>
            <Board
              squares={squares}
              onClick={(i) => this.props.handleClick(i)}
            />
          </div>
          <div className={styles.game_info}>
            <div>{status}</div>
            <div>X Point : {this.props.Xcount}</div>
            <div>O Point : {this.props.Ocount}</div>
            
            {give}
            {pass}
            {restart}

            <p className={styles.win}>{winner}</p>

          </div>
        </div>
      </React.Fragment>
      
    );
  }
}
