import { connect } from "react-redux";
import { clickSquare, clickReset, clickPass, clickGiveUp } from "./actions";
import { Game } from "./App";
import { Dispatch } from "redux";

interface GameState {
  squares: ('O' | 'X' | null)[];
  xIsNext: boolean;
  Xcount: number;
  Ocount: number;
  Winner: ('O' | 'X' | 'Draw' | null);
  isGiveUp: boolean;
}

interface Gstate {
  game: GameState;
}

 const mapStateToProps = (state: Gstate) => {
  return state.game;
};

 const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleClick: (index: number) => {
      dispatch(clickSquare(index));
    },
    setRestart: () => {
      dispatch(clickReset());
    },
    PassTurn: () => {
      dispatch(clickPass());
    },
    GiveUp: () => {
      dispatch(clickGiveUp());
    }
  };
};

 export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);