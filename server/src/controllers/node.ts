import { ResponseMessages } from "../constans";
import { Payload, Point } from "../types";
import { getActivePlayer, togglePlayer } from "./player";
import {
  getActiveNode,
  isValidStartNode,
  isValidEndNode,
  addStartNode,
  addEndNode,
  removeEndNode,
  isGameOver,
} from "./state";

export const EMPTY_NODE: Point = { x: -1, y: -1 };

export const onNodeClicked = (node: Point): Payload => {
  let response;
  if (getActiveNode() === EMPTY_NODE) {
    const valid = isValidStartNode(node);
    if (valid) {
      response = {
        msg: ResponseMessages.VALID_START_NODE,
        body: {
          newLine: null,
          heading: getActivePlayer().name,
          message: null,
        },
      };
      addStartNode(node);
    } else {
      response = {
        msg: ResponseMessages.INVALID_START_NODE,
        body: {
          newLine: null,
          heading: getActivePlayer().name,
          message: "You must start on either end of the path!",
        },
      };
    }
  } else {
    const valid = isValidEndNode(node);
    if (valid) {
      const start = getActiveNode();
      addEndNode(node);
      togglePlayer();
      if (isGameOver()) {
        response = {
          msg: ResponseMessages.GAME_OVER,
          body: {
            newLine: {
              start,
              end: node,
            },
            heading: "Game Over",
            message: `${getActivePlayer().name} Wins!`,
          },
        };
      } else {
        response = {
          msg: ResponseMessages.VALID_END_NODE,
          body: {
            newLine: {
              start,
              end: node,
            },
            heading: getActivePlayer().name,
            message: "",
          },
        };
      }
    } else {
      response = {
        msg: ResponseMessages.INVALID_END_NODE,
        body: {
          newLine: null,
          heading: getActivePlayer().name,
          message: "Invalid move. Try again.",
        },
      };
      removeEndNode();
    }
  }
  return response;
};
