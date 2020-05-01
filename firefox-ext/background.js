// I think it's better to not open this until the user clicks a button in the popup window.
// let ws = new WebSocket("ws://localhost:8055");
let ws = null;

const initWebSocket = () => {
    let ws = new WebSocket("ws://localhost:8055");
    ws.onopen = () => {
        // We have connection to host app
        console.log("Connected");
        ws.send("ext"); // tell the server we are the browser extension.
    }

    ws.onclose = () => {
        // Probably send data to the UI here as well
        console.log("Disconnected");
    }
    return ws;
};


const dataReceived = (data) => {
    console.log("Background recieved", data);
    if (data.connect) {
        ws = initWebSocket();
    } else if (ws) {
        // if web socket is open, send the data to the running app.
        ws.send(data);
    }
};
browser.runtime.onMessage.addListener(dataReceived);
