const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8055 });

// Evenutally i aim to make a nice app to configure this all,
// But to start, I am just going to setup a default speedrun from 1500->2500
let checkpoints = [1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000];
let index = -1;
let liveviewsocket = null;
let webextsocket = null;

wss.on("connection", (socket, req) => {
  console.log("Got Connection");
  console.log(req.socket.localAddress);
  // This is either live view, or the browser extension
  // If it's the browser it will send a identifying message
  if (liveviewsocket == null) {
    liveviewsocket = socket;
  } else {
    webextsocket = socket;
  }
  socket.onmessage = (ev) => {
    console.log(`Got event: ${ev.data}`);
    if (ev.data.name && ev.data.name == "ext") {
      if (webextsocket != socket) {
        let temp = webextsocket
        webextsocket = liveviewsocket;
        liveviewsocket = temp;
      }
    } else {
      // Okay, after this point liveviewsocket and webextsocket should be set correctly
      if (socket == webextsocket) {
        console.log("Sending update to liveview");
        ratingUpdate(ev.data, liveviewsocket);
      }
    }
  };
});

const ratingUpdate = (ratingString, liveViewSocket) => {
  // Now that we have a web socket connection, we can start watching for file changes to
  // the chessrunlog file. This file will be altered with a rating everytime the rating updates on lichess
  // If the rating merits a new split time, we need to send that to the websocket
    console.log(ratingString);
    if (ratingString.endsWith("?")) {
      ratingString = ratingString.slice(0, ratingString.length - 1);
    }
    let data = Number(ratingString);
    console.log("New Rating:", data);
    let newIndex = index;
    for (let i = 0; i < checkpoints.length; i++) {
      if (data >= checkpoints[i]) {
        newIndex = i;
      }
    }
    if (index == -1) {
      liveViewSocket.send("start");
    }
    if (newIndex > index) {
      liveViewSocket.send('split');
      index = newIndex;
    }
};
