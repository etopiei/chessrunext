let chess = null;

browser.runtime.onMessage.addListener((msg) => {
	// This is a message from the popup UI to start web socket.
	console.log("Message received from pop-up", msg);
	if (msg.connect) {
		browser.runtime.sendMessage({connect: true});
	} else if (msg.query) {
		// Return the current state of connection for the web socket
		browser.runtime.sendMessage({query: true});
	} else if (msg.result) {
		// This is a message from the background, most likely with the state of the 
		// ws connection
	}
});

// Check if we can get a good host from the current site.
if (window.location.host === "lichess.org") {
	chess = new LiChess();
} else if (window.location.host.indexOf("chess.com") > -1) {
	chess = new ChessCom();
}

if (chess) {
	if (chess.gameType) {
		// There is a game available to poll
		// set up listener for rating updates and pass through to background script
		chess.ratingUpdate = browser.runtime.sendMessage;
		// and start polling
		chess.startPolling();
	}
}