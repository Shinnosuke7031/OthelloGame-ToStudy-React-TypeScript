import React from 'react';
import * as ReactDOM from 'react-dom';
import Board from './components/Board-Square';
import './index.css';

/*interface HistoryData {
  squares: ('O' | 'X' | null)[];
}*/
interface GameState {
  squares: ('O' | 'X' | null)[];
  xIsNext: boolean;
  Xcount: number;
  Ocount: number;
  Winner: ('O' | 'X' | 'Draw' | null);
}

class Game extends React.Component<{}, GameState> {
  constructor() {
    super({});
    this.state = {
      squares: Array(63).fill(null),
      xIsNext: true,
      Xcount: 2,
      Ocount: 2,
      Winner: null,
    };
  }

  setInitialBoard() { //石の初期配置
    const current = {...this.state.squares};
    current[27] = "X";
    current[36] = "X";
    current[28] = "O";
    current[35] = "O";
    this.setState({
      squares: current,
    });
    //this.state.squares.map((temp)=>console.log(temp));
  }

  handleClick(i: number) {
    const squares = {...this.state.squares};
    if (squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      }, () => this.checkFripOver_Count(i));
  }

  checkFripOver_Count(i: number) {
    const currentXcount = this.state.Xcount;
    const currentOcount = this.state.Ocount;
    const squares = {...this.state.squares};
    const current = squares[i];//現在、クリック（配置）された場所の石（'X' or 'O'）
    const currentROW = Math.floor(i/8);//クリックされた場所の行

    /*------------ Check Right Row --------------*/
    const checkRightNum = ((currentROW + 1) * 8 - 1) - i;  //(34/8+1=5)*8-1=39, 39 - i(=34)= // (iの列の最後尾のindex) - i = チェックする数
    for (let index = i+1; index <= i+checkRightNum; index++) {
      if (squares[index] === current)  {
        for (let j = index; j > i; j--) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /*------------ Check Left Row --------------*/
    const checkLeftNum = i - currentROW * 8;  // i - (iの列の先頭のindex) = チェックする数
    for (let index = i-1; index >= i-checkLeftNum; index--) {
      if (squares[index] === current)  {
        for (let j = index; j < i; j++) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /*------------ Check Up Column --------------*/
    const checkUpNum = i/8;
    for (let index = i-8; index >= i-checkUpNum*8; index-=8) {
      if (squares[index] === current)  {
        for (let j = index; j < i; j+=8) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /*------------ Check Down Column --------------*/
    const checkDownNum = 8-checkUpNum;
    for (let index = i+8; index <= i+checkDownNum*8; index+=8) {
      if (squares[index] === current)  {
        for (let j = index; j > i; j-=8) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /*------------ Check Upper Right --------------*/
    for (let index: number = i-7; index >= i-checkRightNum*7; index-=7) {
      if (squares[index] === current)  {
        for (let j = index; j < i; j+=7) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /*------------ Check Lower Right --------------*/
    for (let index: number = i+9; index <= i+checkRightNum*9; index+=9) {
      if (squares[index] === current)  {
        for (let j = index; j > i; j-=9) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /*------------ Check Upper Left --------------*/
    for (let index = i-9; index >= i-checkLeftNum*9; index-=9) {
      if (squares[index] === current)  {
        for (let j = index; j < i; j+=9) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /*------------ Check Lower Left --------------*/
    for (let index = i+7; index <= i+checkLeftNum*7; index+=7) {
      if (squares[index] === current)  {
        for (let j = index; j > i; j-=7) {
          squares[j] = current;
        }
        break;
      } else if (squares[index] === null) {
        break;
      }
    }

    /* Count Stone */
    let Xcount = 0;
    let Ocount = 0;
    let NULLcount = 0;
    Object.keys(squares).forEach((current)=>{//point!!
      if (squares[+current]==='X') Xcount++;
      else if (squares[+current]==='O') Ocount++;
      NULLcount = 64 - Xcount - Ocount;
      //console.log(squares[+current]);
    });
    
    /* 置けないところ反映 */
    const Xdif: number = Xcount - currentXcount;
    const Odif: number = Ocount - currentOcount;
    if (Xdif===0 || Odif===0) {
      squares[i] = null;
      if (this.state.xIsNext) {
        Ocount--;
      } else {
        Xcount--;
      }
      alert('その場所には配置できません');
      this.setState({xIsNext: !this.state.xIsNext});
    }

    /* Judge Win */
    if (NULLcount===0) {
      if (Xcount > Ocount) {
        this.setState({Winner: 'X'});
      } else if (Xcount < Ocount) {
        this.setState({Winner: 'O'});
      } else {
        this.setState({Winner: 'Draw'});
      }
      
    }

    /* Set State */
    this.setState({
                    squares: squares,
                    Xcount: Xcount,
                    Ocount: Ocount
                  });
  }

  componentDidMount() {
    this.setInitialBoard();
  }

  render() {
    const squares = {...this.state.squares};

    let status;
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    let winner;
    winner = this.state.Winner === null ? ' ' : 'WINNER => '+this.state.Winner;
    return (
      <React.Fragment>
        <header>
          <p className="headerP">
            Othello to study React with TypeScript
          </p>      
        </header>
        <div className="game">
          <div className="game-board">
            <Board
              squares={squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>X Point : {this.state.Xcount}</div>
            <div>O Point : {this.state.Ocount}</div>
            <p className="win">{winner}</p>
          </div>
        </div>
      </React.Fragment>
      
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);