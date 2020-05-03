let ws = null;

const setConnectedStatus = (text) => {
    browser.storage.local.set({"ws_status": text});
};

const initWebSocket = () => {
    ws = new WebSocket("ws://localhost:8055");
    ws.onopen = () => {
        // We have connection to host app
        console.log("Connected");
        ws.send(JSON.stringify({name: "ext"})); // tell the server we are the browser extension.
        setConnectedStatus("Connected");
    }

    ws.onclose = () => {
        // Probably send data to the UI here as well
        console.log("Disconnected");
        setConnectedStatus("Not Connected");
    }
};

const dataReceived = (data) => {
    console.log("Background recieved", data);
    if (data.connect) {
        // we have receieved a command to connect to the ws
        initWebSocket();
    } else if (ws) {
        // if web socket is open, send the data to the running app.
        ws.send(data);
    }
};
browser.runtime.onMessage.addListener(dataReceived);
