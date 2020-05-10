let connectButton = document.getElementById("websocket-connect");
connectButton.addEventListener('click', () => {
    // Send a request to connect to native app
    chrome.tabs.query({active: true, currentWindow: true}, (tabs, error) => {
        chrome.tabs.sendMessage(tabs[0].id, {connect: true});
    });
    // Now hide the connect button because we don't want it clicked twice.
    document.getElementById("websocket-connect").parentNode.removeChild(document.getElementById("websocket-connect"));
    let newText = document.createElement("p");
    newText.innerText = "Connecting";
    document.getElementById("prompt").appendChild(newText);
    // and start polling for connection success in storage
    chrome.storage.onChanged.addListener(() => {
        setConnected();
    });
});

const setConnected = () => {
    // Query the background script so that if we are already connected the UI will be overridden.
    chrome.storage.local.get("ws_status", values => {
        if (values["ws_status"] == "Connected") {
            let prompt = document.getElementById("prompt");
            prompt.innerHTML = "";
            let textEl = document.createElement("p");
            textEl.innerText = "Connected";
            prompt.appendChild(textEl)
        }
    });
};

setConnected();