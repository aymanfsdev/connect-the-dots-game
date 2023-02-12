import { Players } from "../constans";
import { Player } from "../types";

export const PLAYER_1: Player = { name: Players.PLAYER_1 };
export const PLAYER_2: Player = { name: Players.PLAYER_2 };

let activePlayer: Player = PLAYER_1;

export const setActivePlayer = (player: Player): void => {
  activePlayer = player;
};

export const getActivePlayer = (): Player => {
  return activePlayer;
};

export const togglePlayer = (): void => {
  setActivePlayer(activePlayer === PLAYER_2 ? PLAYER_1 : PLAYER_2);
};
