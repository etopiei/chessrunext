document.getElementById("websocket-connect").addEventListener('click', () => {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs, error) => {
        browser.tabs.sendMessage(tabs[0].id, "connect");
    });
    // Now hide the connect button because we don't want it clicked twice.
    document.getElementById("websocket-connect").parentNode.removeChild(document.getElementById("websocket-connect"));
    let newText = document.createElement("p");
    newText.innerText = "Connecting";
    document.appendChild(newText);
});