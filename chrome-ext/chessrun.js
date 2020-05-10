let chess = null;

chrome.runtime.onMessage.addListener((msg) => {
	// This is a message from the popup UI to start web socket.
	console.log("Message received from pop-up", msg);
	if (msg.connect) {
		chrome.runtime.sendMessage({connect: true});
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
		chess.ratingUpdate = chrome.runtime.sendMessage;
		// and start polling
		chess.startPolling();
	}
}