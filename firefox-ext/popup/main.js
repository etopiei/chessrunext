let connectButton = document.getElementById("websocket-connect");
connectButton.addEventListener('click', () => {
    // Send a request to connect to native app
    browser.tabs.query({active: true, currentWindow: true}).then((tabs, error) => {
        browser.tabs.sendMessage(tabs[0].id, {connect: true}).then((d, err) => {
            console.log("Things happened");
        });
    }).catch(err => {
        console.log(err);
    });
    // Now hide the connect button because we don't want it clicked twice.
    document.getElementById("websocket-connect").parentNode.removeChild(document.getElementById("websocket-connect"));
    let newText = document.createElement("p");
    newText.innerText = "Connecting";
    document.getElementById("prompt").appendChild(newText);
    // and start polling for connection success in storage
    browser.storage.onChanged.addListener(() => {
        setConnected();
    });
});

const setConnected = () => {
    // Query the background script so that if we are already connected the UI will be overridden.
    browser.storage.local.get("ws_status").then(values => {
        if (values["ws_status"] == "Connected") {
            let prompt = document.getElementById("prompt");
            prompt.innerHTML = "";
            let textEl = document.createElement("p");
            textEl.innerText = "Connected";
            prompt.appendChild(textEl)
        }
    }).catch(err => {
        console.log(err);
    });
};

setConnected();
