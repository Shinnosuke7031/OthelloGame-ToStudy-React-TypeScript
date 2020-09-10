/*
 * action types
 */

export const CLICK_SQUARE = "CLICK_SQUARE";
export const SET_INITIAL_POSI = "SET_INITIAL_POSI";
export const PASS_TURN = "PASS_TURN";
export const GIVE_UP = "GIVE_UP";

 /*
  * action creators
  */

export function clickSquare(index: number) {
  return { type: CLICK_SQUARE, index };
}

export function clickReset() {
  return { type: SET_INITIAL_POSI };
}

export function clickPass() {
  return { type: PASS_TURN };
}

export function clickGiveUp() {
  return { type: GIVE_UP };
}