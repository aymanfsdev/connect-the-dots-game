import { RequestMessages, ResponseMessages } from "../constans";

export interface Player {
  name: string;
}

export type Point = {
  x: number;
  y: number;
};

export type Line = {
  start: Point | null;
  end: Point;
};

export type StateUpdate = {
  newLine: Line | null;
  heading: string | null;
  message: string | null;
};

export type Payload = {
  msg: RequestMessages | ResponseMessages;
  body: Point | StateUpdate | string | null;
};

type SubscribeCallback = (message: string) => void;

export type App = {
  ports: {
    request: {
      subscribe: (callback: SubscribeCallback) => void;
    };
    response: {
      send: (payload: Payload) => void;
    };
  };
};
