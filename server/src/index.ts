import { App, Payload } from "./types";
import { requestHandler } from "./controllers/request";

const start = (app: App): void => {
  app.ports.request.subscribe((message: string) => {
    const payload: Payload = JSON.parse(message);
    requestHandler(payload);
  });
};

start(app);
