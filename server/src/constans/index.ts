export const enum Players {
  PLAYER_1 = "Player 1",
  PLAYER_2 = "Player 2",
}

export const enum RequestMessages {
  INITIALIZE = "INITIALIZE",
  NODE_CLICKED = "NODE_CLICKED",
  ERROR = "ERROR",
}

export const enum ResponseMessages {
  INITIALIZE = "INITIALIZE",
  VALID_START_NODE = "VALID_START_NODE",
  INVALID_START_NODE = "INVALID_START_NODE",
  VALID_END_NODE = "VALID_END_NODE",
  INVALID_END_NODE = "INVALID_END_NODE",
  GAME_OVER = "GAME_OVER",
  UPDATE_TEXT = "UPDATE_TEXT",
}
