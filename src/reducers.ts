import { combineReducers } from "redux";
import { CLICK_SQUARE, SET_INITIAL_POSI, PASS_TURN, GIVE_UP } from "./actions";

interface Actions {
  type: string;
  index: number;
}

interface GameState {
  squares: ('O' | 'X' | null)[];
  xIsNext: boolean;
  Xcount: number;
  Ocount: number;
  Winner: ('O' | 'X' | 'Draw' | null);
  isGiveUp: boolean;
}

 const initialState: GameState = {
  squares: Array(63).fill(null),
  xIsNext: true,
  Xcount: 2,
  Ocount: 2,
  Winner: null,
  isGiveUp: false
};

 function game(state = initialState, action: Actions) {
  switch (action.type) {
    case CLICK_SQUARE://マスをクリックした時
      //console.log("CLICK_SQUARE");
      const currentXcount = state.Xcount;
      const currentOcount = state.Ocount;
      const squares = {...state.squares};
      if (squares[action.index]) {
        return state;
      }

      squares[action.index] = state.xIsNext ? 'X' : 'O';

      //let xIsNext = !state.xIsNext;
      let xIsNext = !state.xIsNext;

      checkFripOver_Count(action.index, squares);//裏返す
      let [Xcount, Ocount, NULLcount] = countStone(squares);//石を数える

      //置けないところ反映
      const Xdif: number = Xcount - currentXcount;
      const Odif: number = Ocount - currentOcount;
      if (Xdif===0 || Odif===0) {
        squares[action.index] = null;
        if (xIsNext) {
          Ocount--;
        } else {
          Xcount--;
        }
        alert('その場所には配置できません');
        xIsNext = !xIsNext;
      }
      
      let winner: ('O' | 'X' | 'Draw' | null) = null;
      if (NULLcount===0) {
        if (Xcount > Ocount) {
          winner = 'X';
        } else if (Xcount < Ocount) {
          winner = 'O';
        } else {
          winner = 'Draw';
        }
        
      }

      return Object.assign({}, state, {
        squares: squares,
        xIsNext: xIsNext,
        Xcount: Xcount,
        Ocount: Ocount,
        Winner: winner
      });
    
    case SET_INITIAL_POSI:
      //console.log("SET_INITIAL_POSI");
      const current = {...initialState.squares};
      current[27] = "X";
      current[36] = "X";
      current[28] = "O";
      current[35] = "O";
      //console.log(Object.assign({}, state, {squares: current}));
      
      return Object.assign({}, state, initialState, {
        squares: current,
      });

    case PASS_TURN:
      return Object.assign({}, state, {xIsNext: !state.xIsNext});

    case GIVE_UP:
      let winner_by_give;
      if (state.xIsNext) {
        winner_by_give = 'O';
      } else {
        winner_by_give = 'X';
      }
      return Object.assign({}, state, {Winner: winner_by_give});

     default:
      return state;
  }
}

export const app = combineReducers({ game });

/* ------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */

const checkFripOver_Count = (i: number, squares: ('O' | 'X' | null)[]) => {
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

}

const countStone = (squares: ('O' | 'X' | null)[]) => {
  let Xcount = 0;
  let Ocount = 0;
  let NULLcount = 0;
  Object.keys(squares).forEach((current)=>{//point!!
    if (squares[+current]==='X') Xcount++;
    else if (squares[+current]==='O') Ocount++;
    NULLcount = 64 - Xcount - Ocount;
    //console.log(squares[+current]);
  });

  return [Xcount, Ocount, NULLcount];
  
}