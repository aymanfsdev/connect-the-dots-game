import { Payload, Point } from "../types";
import { Players, RequestMessages, ResponseMessages } from "../constans";
import { PLAYER_1, setActivePlayer } from "./player";
import { setActiveNode } from "./state";
import { EMPTY_NODE, onNodeClicked } from "./node";

const INIT_GAME_RESPONSE = {
  msg: ResponseMessages.INITIALIZE,
  body: {
    newLine: null,
    heading: Players.PLAYER_1,
    message: null,
  },
};

export const sendResponse = (payload: Payload): void => {
  app.ports.response.send(payload);
};

export const requestHandler = (payload: Payload) => {
  console.log("REQUEST:", payload);
  let response = null;
  switch (payload.msg) {
    case RequestMessages.INITIALIZE:
      setActivePlayer(PLAYER_1);
      setActiveNode(EMPTY_NODE);
      response = INIT_GAME_RESPONSE;
      break;
    case RequestMessages.NODE_CLICKED:
      response = onNodeClicked(payload.body as Point);
      break;
    case RequestMessages.ERROR:
      console.error("ERROR", payload);
      break;
  }

  if (response) {
    console.log("RESPONSE:", response);
    sendResponse(response);
  }
};
